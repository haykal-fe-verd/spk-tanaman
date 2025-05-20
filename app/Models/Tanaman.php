<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tanaman extends Model
{
    use HasUuids;

    protected $table = 'tb_tanaman';
    protected $keyType = 'string';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = [
        'nama',
        'deskripsi',
    ];

    // relasi
    public function syaratTanam(): HasMany
    {
        return $this->hasMany(SyaratTanam::class, 'id_tanaman', 'id');
    }

    public function riwayatTanam(): HasMany
    {
        return $this->hasMany(RiwayatTanam::class, 'id_tanaman', 'id');
    }
}
