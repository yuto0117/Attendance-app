<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    //
    protected $fillable = [
        'member_id',
        'date',
        'attendance_status',
    ];
   
}
