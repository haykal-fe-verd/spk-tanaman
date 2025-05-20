<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SyaratTanam extends Model
{
    use HasUuids;

    protected $table = 'tb_syarat_tanam';
    protected $keyType = 'string';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = [
        'id_tanaman',
        'id_kriteria',
        'id_sub_kriteria',
        'nilai'
    ];

    // relasi
    public function tanaman(): BelongsTo
    {
        return $this->belongsTo(Tanaman::class, 'id_tanaman', 'id');
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
