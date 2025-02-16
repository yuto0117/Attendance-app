<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DailyReportController;
use App\Http\Controllers\DailyReportRecordController;
use App\Http\Controllers\DailyReportByDateController;


Route::get('/employees', [UserController::class, 'index']);

Route::get('/member', [MemberController::class, 'index']);

Route::post('/update-attendance', [AttendanceController::class, 'updateAttendanceStatus']);
Route::post('/date-attendance', [AttendanceController::class, 'getDateAttendance']);

Route::post('/update-reports', [DailyReportController::class, 'updateReports']);

Route::post('/employee-reports', [DailyReportController::class, 'showReports']);

Route::post('/daily-reports-record', [DailyReportRecordController::class, 'showDailyReportsRecord']);

Route::post('/daily-reports-by-date', [DailyReportByDateController::class, 'showReportsByDate']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
