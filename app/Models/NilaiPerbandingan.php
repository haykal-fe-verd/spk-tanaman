<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NilaiPerbandingan extends Model
{
    use HasUuids;

    protected $table = 'tb_nilai_perbandingan';
    protected $keyType = 'string';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = [
        'id_kriteria_1',
        'id_kriteria_2',
        'nilai',
    ];

    // relasi
    public function kriteria1(): BelongsTo
    {
        return $this->belongsTo(Kriteria::class, 'id_kriteria_1', 'id');
    }

    public function kriteria2(): BelongsTo
    {
        return $this->belongsTo(Kriteria::class, 'id_kriteria_2', 'id');
    }
}
