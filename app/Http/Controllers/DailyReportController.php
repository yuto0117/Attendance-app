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
use Illuminate\Support\Facades\DB;

class DailyReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $date = Carbon::now()->toDateString();
        $employeeId = Auth::user()->employee_id;

        DB::transaction(function () use ($date, $employeeId) {
            $members = Member::all();

            $generalReport = GeneralReport::firstOrCreate(
                [
                    'employee_id' => $employeeId,
                    'general_report_date' => $date,
                ],
                [
                    'handover_content' => '',
                    'general_report_content' => '',
                ]
            );

            foreach ($members as $member) {
                Attendance::firstOrCreate([
                    'member_id' => $member->member_id,
                    'date' => $date,
                ], [
                    'attendance_status' => '未設定',
                ]);
            }

            foreach ($members as $member) {
                DailyReport::firstOrCreate([
                    'member_id' => $member->member_id,
                    'employee_id' => $employeeId,
                    'report_date' => $date,
                ], [
                    'report' => '',
                ]);
            }
        });

        $attendanceMembers = Member::with([
            'attendances' => function ($query) use ($date) {
                $query->where('date', $date);
            },
            'dailyReports' => function ($query) use ($date, $employeeId) {
                $query->where('report_date', $date)
                    ->where('employee_id', $employeeId);
            }
        ])->get();

        $employees = User::all();
        $generalReport = GeneralReport::where('employee_id', $employeeId)
            ->where('general_report_date', $date)
            ->first();

        return Inertia::render('Home/ReportForm', [
            'attendanceMembers' => $attendanceMembers,
            'employees' => $employees,
            'generalReport' => $generalReport,
        ]);
    }

    public function updateReports(Request $request)
    {
        $date = Carbon::now()->toDateString();

        DB::transaction(function () use ($request) {
            $data = $request->input('reports');
            $employeeId = $request->input('employeeId');
            $genelalContent = $request->input('genelalContent');
            $handoverContent = $request->input('handoverContent');
            $generalReportDate = $request->input('date');

            GeneralReport::where('general_report_date', $generalReportDate)
                ->where('employee_id', $employeeId)
                ->update([
                    'handover_content' => $handoverContent,
                    'general_report_content' => $genelalContent,
                ]);

            foreach ($data as $reportData) {
                DailyReport::where('id', $reportData['daily_reports'][0]['id'])
                    ->where('report_date', $reportData['daily_reports'][0]['report_date'])
                    ->update(['report' => $reportData['daily_reports'][0]['report']]);
            }
        });

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
    
        if (!$employee) {
            return response()->json([
                'error' => 'Employee not found with the provided employee_id.'
            ], 404);
        }
    
        try {
            $generalReport = DB::transaction(function () use ($date, $employeeId, $members) {
                $generalReport = GeneralReport::firstOrCreate(
                    [
                        'employee_id' => $employeeId,
                        'general_report_date' => $date,
                    ],
                    [
                        'handover_content' => '',
                        'general_report_content' => '',
                    ]
                );
    
                foreach ($members as $member) {
                    Attendance::firstOrCreate([
                        'member_id' => $member->member_id,
                        'date' => $date,
                    ], [
                        'attendance_status' => '未設定',
                    ]);
                }
    
                foreach ($members as $member) {
                    DailyReport::firstOrCreate([
                        'member_id' => $member->member_id,
                        'employee_id' => $employeeId,
                        'report_date' => $date,
                    ], [
                        'report' => "",
                    ]);
                }
    
                return $generalReport;
            });
    
            $attendanceMembers = Member::with([
                'attendances' => function ($query) use ($date) {
                    $query->where('date', $date);
                },
                'dailyReports' => function ($query) use ($date, $employeeId) {
                    $query->where('report_date', $date)
                        ->where('employee_id', $employeeId);
                }
            ])->get();
    
            return response()->json([
                'attendanceMembers' => $attendanceMembers,
                'generalReport' => $generalReport
            ]);
    
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'データの保存中にエラーが発生しました。',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}