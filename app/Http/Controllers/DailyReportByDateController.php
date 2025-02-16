<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Member;
use App\Models\Attendance;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\DailyReport;
use App\Models\GeneralReport;

class DailyReportByDateController extends Controller
{
    //
    public function index()
    {
        
        
        $members = Member::all();
        $employees = User::all();
        $date = Carbon::now()->toDateString(); 
        $authEmployeeId = Auth::user()->employee_id;
    

        $generalReports = GeneralReport::where('general_report_date', $date)->get();

        if ($generalReports->isEmpty()) {
            GeneralReport::create([
                'handover_content' => '',
                'general_report_content' => '',
                'general_report_date' => $date,
                'employee_id' => $authEmployeeId,
            ]);

            $generalReports = GeneralReport::where('general_report_date', $date)->get();
            }

        

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

        foreach ($members as $member) {
            $existingReport = DailyReport::where('member_id', $member->member_id)
                                             ->where('report_date', $date)
                                             ->where('employee_id', $authEmployeeId)
                                             ->first();

            if (!$existingReport) {
                DailyReport::create([
                    'member_id' => $member->member_id,
                    'employee_id' =>$authEmployeeId ,
                    'report_date' => $date,
                    'report' =>"" ,
                ]);
            }
        }
        


       $attendanceMembers = Member::with([
        'attendances' => function ($query) use ($date) {
            $query->where('date', $date);  
        },
        'dailyReports' => function ($query) use ($date) {
            $query->where('report_date', $date); 
        }
        ])->get();

        return Inertia::render('Home/DailyReportByDate', [
            'attendanceMembers' => $attendanceMembers,
            'employees' => $employees,
            'date' => $date,
            'authEmployeeId' => $authEmployeeId,
            'generalReports' => $generalReports,
        ]);
    
    }

    public function showReportsByDate(Request $request)
    {
        
        
        $members = Member::all();
        $employees = User::all();
        $date = $request->input('date');
        $authEmployeeId = $request->input('authEmployeeId');

        $generalReports = GeneralReport::where('general_report_date', $date)->get();

        if ($generalReports->isEmpty()) {
            GeneralReport::create([
                'handover_content' => '',
                'general_report_content' => '',
                'general_report_date' => $date,
                'employee_id' => $authEmployeeId,
            ]);

            $generalReports = GeneralReport::where('general_report_date', $date)->get();
            }


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

        foreach ($members as $member) {
            $existingReport = DailyReport::where('member_id', $member->member_id)
                                             ->where('report_date', $date)
                                             ->where('employee_id', $authEmployeeId)
                                             ->first();

            if (!$existingReport) {
                DailyReport::create([
                    'member_id' => $member->member_id,
                    'employee_id' =>$authEmployeeId ,
                    'report_date' => $date,
                    'report' =>"" ,
                ]);
            }
        }
        


       $attendanceMembers = Member::with([
        'attendances' => function ($query) use ($date) {
            $query->where('date', $date);  
        },
        'dailyReports' => function ($query) use ($date) {
            $query->where('report_date', $date); 
        }
        ])->get();


        return response()->json([
            'attendanceMembers' => $attendanceMembers,
            'generalReports' => $generalReports
        ]);
    
    }
}
