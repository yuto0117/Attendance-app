<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Member;
use Inertia\Inertia;
use App\Models\User;
use Carbon\Carbon;

class DailyReportRecordController extends Controller
{
    //
    public function index()
{
    $startDate = Carbon::now()->subMonth()->format('Y-m-d');
    $endDate = Carbon::now()->format('Y-m-d');
    $employees = User::all();

    $attendanceMembers = Member::where('member_id', 1) 
        ->with([
            'attendances' => function ($query) use ($startDate, $endDate) {
                $query->whereBetween('date', [$startDate, $endDate])
                ->orderBy('date', 'desc');  
            },
            'dailyReports' => function ($query) use ($startDate, $endDate) {
                $query->whereBetween('report_date', [$startDate, $endDate])
                ->orderBy('report_date', 'desc');
            }
        ])
        ->get();

    return Inertia::render('Home/DailyReportRecord', [
        'attendanceMembers' => $attendanceMembers,
        'employees' => $employees,
        'startdate' => $startDate,
        'enddate' => $endDate,
    ]);
}
public function showDailyReportsRecord(Request $request)
{
    $startDate = $request->input('startDate');
    $endDate = $request->input('endDate');
    $memberId = $request->input('memberId');
    $employees = User::all();

    $attendanceMembers = Member::where('member_id', $memberId) // メンバーIDが1の条件
        ->with([
            'attendances' => function ($query) use ($startDate, $endDate) {
                $query->whereBetween('date', [$startDate, $endDate])
                ->orderBy('date', 'desc');  
            },
            'dailyReports' => function ($query) use ($startDate, $endDate) {
                $query->whereBetween('report_date', [$startDate, $endDate])
                ->orderBy('report_date', 'desc');
            }
        ])
        ->get();


    return response()->json($attendanceMembers);
}
}
