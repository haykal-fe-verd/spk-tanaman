<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KriteriaRiwayatTanam extends Model
{
    use HasUuids;

    protected $table = 'tb_kriteria_riwayat_tanam';
    protected $keyType = 'string';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = [
        'id_riwayat_tanam',
        'id_kriteria',
        'id_sub_kriteria',
    ];

    // relasi
    public function riwayatTanam(): BelongsTo
    {
        return $this->belongsTo(RiwayatTanam::class, 'id_riwayat_tanam', 'id');
    }

    public function kriteria(): BelongsTo
    {
        return $this->belongsTo(Kriteria::class, 'id_kriteria', 'id');
    }

    public function subKriteria(): BelongsTo
    {
        return $this->belongsTo(SubKriteria::class, 'id_sub_kriteria', 'id');
    }
}
