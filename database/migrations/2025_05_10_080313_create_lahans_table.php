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
        Schema::create('tb_lahan', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('id_user')
                ->constrained('tb_user')
                ->onUpdate('cascade')
                ->onDelete('cascade')
                ->comment('id user');
            $table->string('nama')
                ->comment('nama lahan');
            $table->text('lokasi')
                ->nullable()
                ->comment('lokasi lahan');
            $table->float('luas')
                ->nullable()
                ->comment('luas lahan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_lahan');
    }
};
