<?php

namespace App\Http\Controllers;

use App\Models\DailyReport;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Member;
use App\Models\Attendance;
use App\Models\GeneralReport;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DailyReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        
        $members = Member::all();
        $employees = User::all();
        $date = Carbon::now()->toDateString(); 


        // $generalReport = GeneralReport::where('employee_id', Auth::user()->employee_id)
        //                                      ->where('general_report_date', $date)
        //                                      ->first();
                            
        // if (!$generalReport) {
        // GeneralReport::create([
        //     'handover_content' => '',
        //     'general_report_content' => '',
        //     'general_report_date' => $date,
        //     'employee_id' => Auth::user()->employee_id,
        // ]);
        // }

        // $generalReport = GeneralReport::where('employee_id', Auth::user()->employee_id)
        // ->where('general_report_date', $date)
        // ->first();

        $generalReport = GeneralReport::firstOrCreate(
            [
                'employee_id' => Auth::user()->employee_id,
                'general_report_date' => $date,
            ],
            [
                'handover_content' => '',
                'general_report_content' => '',
            ]
        );

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
                                             ->where('employee_id', Auth::user()->employee_id)
                                             ->first();

            if (!$existingReport) {
                DailyReport::create([
                    'member_id' => $member->member_id,
                    'employee_id' =>Auth::user()->employee_id ,
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
            $query->where('report_date', $date)
            ->where('employee_id', Auth::user()->employee_id);;  
        }
        ])->get();

        return Inertia::render('Home/ReportForm', [
            'attendanceMembers' => $attendanceMembers,
            'employees' => $employees,
            'generalReport' => $generalReport,
        ]);
    
    }

    public function updateReports(Request $request)
    {

        $data = $request->input('reports'); 
        $employeeId = $request->input('employeeId');
        $generalReport = $request->input('generalReport');
        $genelalContent = $request->input('genelalContent');
        $handoverContent = $request->input('handoverContent');  
        $generalReportDate = $request->input('date'); 

        GeneralReport::where('general_report_date', $generalReportDate)
                       ->where('employee_id',$employeeId)
                       ->update([
                        'handover_content' => $handoverContent,
                        'general_report_content' => $genelalContent,
                    ]);                  
    
        foreach ($data as $reportData) {
            DailyReport::where('id', $reportData['daily_reports'][0]['id'])
                ->where('report_date', $reportData['daily_reports'][0]['report_date'])
                ->update(['report' => $reportData['daily_reports'][0]['report']]);
    
        }
        
        $date = Carbon::now()->toDateString(); 

        $attendanceMembers = Member::with([
            'attendances' => function ($query) use ($date) {
                $query->where('date', $date);  
            },
            'dailyReports' => function ($query) use ($date) {
                $query->where('report_date', $date);  
            }
            ])->get();
    
        return response()->json($attendanceMembers);
    }

    public function showReports(Request $request)
    {
        $members = Member::all();
        $date = $request->input('date');
        $employeeId = $request->input('employeeId');
        $employee = User::where('employee_id', $employeeId)->first();

       

        $generalReport = GeneralReport::firstOrCreate(
            [
                'employee_id' =>  $employeeId,
                'general_report_date' => $date,
            ],
            [
                'handover_content' => '',
                'general_report_content' => '',
            ]
        );


        if ($employee) {
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
                                                 ->where('employee_id', $employeeId)
                                                 ->first();
    
                if (!$existingReport) {
                    DailyReport::create([
                        'member_id' => $member->member_id,
                        'employee_id' =>$employeeId ,
                        'report_date' => $date,
                        'report' =>"" ,
                    ]);
                }
            }
            
    
    
           $attendanceMembers = Member::with([
            'attendances' => function ($query) use ($date) {
                $query->where('date', $date);  
            },
            'dailyReports' => function ($query) use ($date,$employeeId) {
                $query->where('report_date', $date)
                ->where('employee_id', $employeeId);
            }
            ])->get();
    
            return response()->json([
                'attendanceMembers' => $attendanceMembers,
                'generalReport' => $generalReport
            ]);
        }else {
            return response()->json([
                'error' => 'Employee not found with the provided employee_id.'
            ], 404);
        }
        
        
    }
}
