<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RiwayatTanam extends Model
{
    use HasUuids;

    protected $table = 'tb_riwayat_tanam';
    protected $keyType = 'string';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = [
        'id_lahan',
        'id_tanaman',
        'tanggal_tanam',
        'tanggal_panen',
        'tanggal_istirahat',
    ];

    // relasi
    public function lahan(): BelongsTo
    {
        return $this->belongsTo(Lahan::class, 'id_lahan', 'id');
    }

    public function tanaman(): BelongsTo
    {
        return $this->belongsTo(Tanaman::class, 'id_tanaman', 'id');
    }

    public function kriteriaRiwayatTanam(): HasMany
    {
        return $this->hasMany(KriteriaRiwayatTanam::class, 'id_riwayat_tanam', 'id');
    }
}
