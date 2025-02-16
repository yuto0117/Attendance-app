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

    //    $attendanceMembers = Member::with('attendances')->get();
       $attendanceMembers = Member::with(['attendances' => function($query) use ($date) {
       $query->where('date', $date);
       }])->get();

        return Inertia::render('Home/AttendanceForm', [
            'attendanceMembers' => $attendanceMembers,
        ]);
    }

    public function updateAttendanceStatus(Request $request)
    {
        
        $validated = $request->validate([
            'member_id' => 'required|string',
            'date' => 'required|date',
            'attendance_status' => 'required|string',
        ]);

        // 出席情報を更新
        $attendance = Attendance::where('member_id', $validated['member_id'])
                                ->where('date', $validated['date'])
                                ->first();

        

        if ($attendance) {
            $attendance->attendance_status = $validated['attendance_status'];
            $attendance->save();

            $date = $validated['date'];

            $attendanceMembers = Member::with(['attendances' => function($query) use ($date) {
                $query->where('date', $date); 
            }])->get();

            return response()->json($attendanceMembers);
        }

    }

    public function getDateAttendance(Request $request)
    {
        
        $members = Member::all();

        $date = $request->date; 



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
