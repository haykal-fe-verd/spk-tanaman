<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_kriteria', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nama')->comment('nama kriteria');
            $table->enum('tipe', ['benefit', 'cost'])->comment('tipe kriteria');
            $table->decimal('bobot', 5, 4)->nullable()->comment('bobot kriteria (bobot AHP)');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_kriteria');
    }
};
