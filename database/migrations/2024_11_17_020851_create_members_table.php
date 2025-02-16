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
        Schema::create('members', function (Blueprint $table) {
            $table->id(); // プライマリキー
            $table->string('member_id')->unique(); // メンバーID
            $table->string('name'); // メンバー名
            $table->string('phonetic_reading'); // 仮名呼び
            $table->string('gender'); // 性別
            $table->date('birthday'); // 誕生日
            $table->date('start_date'); // 開始日
            $table->date('end_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
