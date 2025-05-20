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
        Schema::create('tb_kriteria_lahan', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('id_lahan')
                ->constrained('tb_lahan')
                ->onUpdate('cascade')
                ->onDelete('cascade')
                ->comment('id lahan');
            $table->foreignUuid('id_kriteria')
                ->constrained('tb_kriteria')
                ->onUpdate('cascade')
                ->onDelete('cascade')
                ->comment('id kriteria');
            $table->foreignUuid('id_sub_kriteria')
                ->constrained('tb_sub_kriteria')
                ->onUpdate('cascade')
                ->onDelete('cascade')
                ->comment('id sub kriteria');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_kriteria_lahan');
    }
};
