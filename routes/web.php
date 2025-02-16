<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use Inertia\Inertia;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DailyReportController;
use App\Http\Controllers\DailyReportRecordController;
use App\Http\Controllers\DailyReportByDateController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Home

Route::get('/home', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('Home');


Route::get('/attendance', [AttendanceController::class, 'index']);

Route::get('/report', [DailyReportController::class, 'index']);

Route::get('/daily-report-record', [DailyReportRecordController::class, 'index']);

Route::get('/daily-report-by-date', [DailyReportByDateController::class, 'index']);

Route::get('/employee-master', function () {
    return Inertia::render('Home/EmployeeMaster');
})->name('EmployeeMaster');

Route::get('/member-master', function () {
    return Inertia::render('Home/MemberMaster');
})->name('MemberMaster');


// EmployeeMaster

Route::get('/emplyee-register', function () {
    return Inertia::render('Employee/RegisterScreen');
});
Route::post('/employee-register', [EmployeeController::class, 'store'])->name('employee-register');

Route::get('/employee-edit', function () {
    return Inertia::render('Employee/EditScreen');
});
Route::post('/employee-edit', [EmployeeController::class, 'edit']);

Route::get('/employee-confirmation', function () {
    return Inertia::render('Employee/ConfirmationScreen', [
        'url' => '/employee-register',
        'btn' => '登録'
    ]);
});
Route::post('/employee-confirmation', [EmployeeController::class, 'confirmation'])->name('EmployeeConfirmation');

Route::get('/employee-update-confirmation', function () {
    return Inertia::render('Employee/ConfirmationScreen', [
        'url' => '/employee-update',
        'btn' => '更新'
    ]);
});
Route::post('/employee-update-confirmation', [EmployeeController::class, 'updateconfirmation'])->name('EmployeeUpdateConfirmation');

Route::get('/employee-delete-confirmation', function () {
    return Inertia::render('Employee/ConfirmationScreen', [
        'url' => '/employee-delete',
        'btn' => '削除'
    ]);
});
Route::post('/employee-delete-confirmation', [EmployeeController::class, 'deleteconfirmation']);

Route::post('/employee-update', [EmployeeController::class, 'update']);
Route::post('/employee-delete', [EmployeeController::class, 'delete']);


// MemberMaster

Route::get('/member-register', function () {
    return Inertia::render('Member/RegisterScreen');
});
Route::post('/member-register', [MemberController::class, 'store']);

Route::get('/member-confirmation', function () {
    return Inertia::render('Member/ConfirmationScreen', [
        'url' => '/member-register',
        'btn' => '登録'
    ]);
});
Route::post('/member-confirmation', [MemberController::class, 'confirmation'])->name('MemberConfirmation');

Route::get('/member-update-confirmation', function () {
    return Inertia::render('Member/ConfirmationScreen', [
        'url' => '/member-update',
        'btn' => '更新'
    ]);
});
Route::post('/member-update-confirmation', [MemberController::class, 'updateconfirmation']);

Route::get('/member-edit', function () {
    return Inertia::render('Member/EditScreen');
});
Route::post('/member-edit', [MemberController::class, 'edit']);

Route::get('/member-delete-confirmation', function () {
    return Inertia::render('Member/ConfirmationScreen', [
        'url' => '/member-delete',
        'btn' => '削除'
    ]);
});
Route::post('/member-delete-confirmation', [MemberController::class, 'deleteconfirmation']);

Route::post('/member-update', [MemberController::class, 'update']);
Route::post('/member-delete', [MemberController::class, 'delete']);



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
