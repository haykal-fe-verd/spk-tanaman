<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lahan extends Model
{
    use HasUuids;

    protected $table = 'tb_lahan';
    protected $keyType = 'string';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = [
        'id_user',
        'nama',
        'lokasi',
        'luas',
    ];

    // relasi
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }

    public function riwayatTanam(): HasMany
    {
        return $this->hasMany(RiwayatTanam::class, 'id_lahan', 'id');
    }

    public function kriteriaLahan(): HasMany
    {
        return $this->hasMany(KriteriaLahan::class, 'id_lahan', 'id');
    }
}
