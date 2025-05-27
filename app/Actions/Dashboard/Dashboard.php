<?php

namespace App\Actions\Dashboard;

use App\Helpers\Helpers;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Carbon;
use App\Models\Kriteria;
use App\Models\SubKriteria;
use App\Models\Tanaman;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Dashboard
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function handle(Request $request): Response
    {
        $helper = new Helpers();

        $statisticAdmin = [];
        $chartAdmin = [];
        $statisticUser = [];
        $chartUser = [];
        $chartTanaman = [];

        if ($helper->is_admin()) {
            $allMonths = collect([
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'Mei',
                'Jun',
                'Jul',
                'Agt',
                'Sep',
                'Okt',
                'Nov',
                'Des',
            ]);

            $usersByMonth = User::where('role', 'user')
                ->get()
                ->groupBy(function ($user) {
                    return Carbon::parse($user->created_at)->format('n');
                });

            $statisticAdmin = [
                'tanaman' => Tanaman::count(),
                'kriteria' => Kriteria::count(),
                'sub_kriteria' => SubKriteria::count(),
                'pengguna' => User::where('role', 'user')->count(),
            ];


            $chartAdmin = $allMonths->map(function ($monthName, $index) use ($usersByMonth) {
                $monthIndex = $index + 1;
                $count = isset($usersByMonth[$monthIndex]) ? count($usersByMonth[$monthIndex]) : 0;

                return [
                    'month' => $monthName,
                    'user' => $count,
                ];
            });
        } else {
            $lahanList = $request->user()->lahan;
            $totalRiwayatTanam = 0;

            foreach ($lahanList as $lahan) {
                $totalRiwayatTanam += $lahan->riwayatTanam()->count();
            }

            $statisticUser = [
                'lahan' => $lahanList->count(),
                'riwayat_tanam' => $totalRiwayatTanam,
                'tanaman' => Tanaman::count(),
                'kriteria' => Kriteria::count(),
            ];

            $chartUser = collect(range(1, 12))->map(function ($month) use ($lahanList) {
                $count = 0;

                foreach ($lahanList as $lahan) {
                    $count += $lahan->riwayatTanam()
                        ->whereMonth('created_at', $month)
                        ->count();
                }

                return [
                    'month' => Carbon::create()->month($month)->isoFormat('MMM'),
                    'total' => $count,
                ];
            });

            $colors = [
                'Padi' => 'var(--color-padi)',
                'Jagung' => 'var(--color-jagung)',
                'Tembakau' => 'var(--color-tembakau)',
                'Cabai Besar' => 'var(--color-cabai-besar)',
                'Cabai Rawit' => 'var(--color-cabai-rawit)',
                'Tomat' => 'var(--color-tomat)',
                'Bawang Merah' => 'var(--color-bawang-merah)',
            ];


            $rawTanaman = DB::table('tb_riwayat_tanam')
                ->select('tb_tanaman.nama as name', DB::raw('count(*) as value'))
                ->join('tb_tanaman', 'tb_tanaman.id', '=', 'tb_riwayat_tanam.id_tanaman')
                ->whereIn('id_lahan', $lahanList->pluck('id'))
                ->groupBy('tb_riwayat_tanam.id_tanaman', 'tb_tanaman.nama')
                ->orderByDesc('value')
                ->get();

            $chartTanaman = $rawTanaman->map(function ($item) use ($colors) {
                return [
                    'name' => $item->name,
                    'value' => $item->value,
                    'fill' => $colors[$item->name] ?? 'var(--color-other)',
                ];
            });
        }

        return Inertia::render('dashboard/index', [
            'statisticAdmin' => $statisticAdmin,
            'chartAdmin' => $chartAdmin,
            'statisticUser' => $statisticUser,
            'chartUser' => $chartUser,
            'chartTanaman' => $chartTanaman,
        ]);
    }
}
