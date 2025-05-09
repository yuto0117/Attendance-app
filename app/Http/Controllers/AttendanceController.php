<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Member;
use App\Models\Attendance;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    //
    public function index()
    {
        
        $members = Member::all();

        $date = Carbon::now()->toDateString(); 

        

        foreach ($members as $member) {
            $existingAttendance = Attendance::where('member_id', $member->member_id)
                                             ->where('date', $date)
                                             ->first();

            if (!$existingAttendance) {
                Attendance::create([
                    'member_id' => $member->member_id,
                    'date' => $date,
                    'attendance_status' => '未設定',
                ]);
            }
        }

    
       $attendanceMembers = Member::with(['attendances' => function($query) use ($date) {
       $query->where('date', $date);
       }])->get();

        return Inertia::render('Home/AttendanceForm', [
            'attendanceMembers' => $attendanceMembers,
        ]);
    }

    public function updateAttendanceStatus(Request $request)
    {
        
        $member_id = $request->input('member_id');
        $date = $request->input('date');
        $attendance_status = $request->input('attendance_status');

        $attendance = Attendance::where('member_id', $member_id)
                                ->where('date', $date)
                                ->first();

        

        if ($attendance) {
            $attendance->attendance_status = $attendance_status;
            $attendance->save();


            $attendanceMembers = Member::with(['attendances' => function($query) use ($date) {
                $query->where('date', $date); 
            }])->get();

            return response()->json($attendanceMembers);
        }

    }

    public function getDateAttendance(Request $request)
    {
        
        $members = Member::all();

        $date = $request->input('date'); 

        foreach ($members as $member) {
            $existingAttendance = Attendance::where('member_id', $member->member_id)
                                             ->where('date', $date)
                                             ->first();

            if (!$existingAttendance) {
                Attendance::create([
                    'member_id' => $member->member_id,
                    'date' => $date,
                    'attendance_status' => '未設定',
                ]);
            }
        }

    
        $attendanceMembers = Member::with(['attendances' => function($query) use ($date) {
        $query->where('date', $date); 
       }])->get();
        

       return response()->json($attendanceMembers);

    }

       
    
}
