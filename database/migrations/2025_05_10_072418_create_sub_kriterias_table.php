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
        Schema::create('tb_sub_kriteria', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('id_kriteria')
                ->constrained('tb_kriteria')
                ->onUpdate('cascade')
                ->onDelete('cascade')
                ->comment('id kriteria');
            $table->string('nama')
                ->comment('nama sub kriteria');
            $table->decimal('nilai', 5, 4)
                ->nullable()
                ->comment('nilai sub kriteria (nilai TOPSIS)');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_sub_kriteria');
    }
};
