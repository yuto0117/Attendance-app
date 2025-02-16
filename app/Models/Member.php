<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Attendance;
use App\Models\DailyReport;

class Member extends Model
{
    //
    protected $fillable = [
        'name',
        'member_id',
        'phonetic_reading',
        'gender',
        'birthday',
        'start_date',
        'end_date',
    ];

    public function attendances()
    {
        return $this->hasMany(Attendance::class, 'member_id', 'member_id');
    }

    public function dailyReports()
    {
        return $this->hasMany(DailyReport::class, 'member_id', 'member_id');
    }
}
