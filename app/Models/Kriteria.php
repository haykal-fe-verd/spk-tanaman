<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kriteria extends Model
{
    use HasUuids;

    protected $table = 'tb_kriteria';
    protected $keyType = 'string';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = [
        'nama',
        'tipe',
        'bobot'
    ];

    // relasi
    public function subKriteria(): HasMany
    {
        return $this->hasMany(SubKriteria::class, 'id_kriteria', 'id');
    }
}
