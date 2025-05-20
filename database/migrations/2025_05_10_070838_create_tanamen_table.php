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
        Schema::create('tb_tanaman', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nama')->comment('nama tanaman');
            $table->text('deskripsi')->nullable()->comment('deskripsi tanaman');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_tanaman');
    }
};
