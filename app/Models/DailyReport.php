<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyReport extends Model
{
    //
    protected $fillable = [
        'member_id', 
        'employee_id', 
        'report_date', 
        'report'
    ];
}
