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
        Schema::create('general_reports', function (Blueprint $table) {
            $table->id();
            $table->text('handover_content')->nullable();
            $table->text('general_report_content')->nullable();
            $table->date('general_report_date');
            $table->string('employee_id') ;
            $table->foreign('employee_id')->references('employee_id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('general_reports');
    }
};
