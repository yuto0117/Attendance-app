<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GeneralReport extends Model
{
    //
    protected $fillable = ['handover_content', 'general_report_content', 'general_report_date', 'employee_id'];
}
