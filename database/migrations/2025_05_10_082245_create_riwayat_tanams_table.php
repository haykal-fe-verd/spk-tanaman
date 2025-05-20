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
        Schema::create('tb_riwayat_tanam', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('id_lahan')
                ->constrained('tb_lahan')
                ->onUpdate('cascade')
                ->onDelete('cascade')
                ->comment('id lahan');
            $table->foreignUuid('id_tanaman')
                ->constrained('tb_tanaman')
                ->onUpdate('cascade')
                ->onDelete('cascade')
                ->comment('id tanaman');
            $table->date('tanggal_tanam')
                ->comment('tanggal tanam');
            $table->date('tanggal_panen')
                ->nullable()
                ->comment('tanggal tanam');
            $table->date('tanggal_istirahat')
                ->nullable()
                ->comment('tanggal istirahat');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_riwayat_tanam');
    }
};
