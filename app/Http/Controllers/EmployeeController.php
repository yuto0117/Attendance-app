<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;


class EmployeeController extends Controller
{
    //
    public function store(Request $request): RedirectResponse
    {
       
        $request->validate([
            'employee_id' => 'required|integer|unique:users,employee_id',
        ]);

        $user = User::create([
            'name' => $request->name,
            'phonetic_reading'=> $request->phonetic_reading,
            'employee_id' => $request->employee_id,
            'password' => Hash::make($request->password),
            'email'=> $request->email,
            'type'=> $request->type,
            'status'=> $request->status,
        ]);


        return redirect(route('EmployeeMaster', absolute: false));
    }

    public function confirmation(Request $request)
    {
       

        $data = $request->all();

        return Inertia::render('Employee/ConfirmationScreen', [
            'employeedata' => $data,
            'url' => '/employee-register',
            'btn' => '登録',
            'heading' => '社員情報登録の確認'
        ]);

    }

    public function updateconfirmation(Request $request)
    {
       

        $data = $request->all();

        return Inertia::render('Employee/ConfirmationScreen', [
            'employeedata' => $data,
            'url' => '/employee-update',
            'btn' => '更新',
            'heading' => '社員情報更新の確認'
        ]);

    }

    public function deleteconfirmation(Request $request)
    {
       

        $data = $request->all();

        return Inertia::render('Employee/ConfirmationScreen', [
            'employeedata' => $data,
            'url' => '/employee-delete',
            'btn' => '削除',
            'heading' => '社員情報削除の確認'
        ]);

    }


    public function edit(Request $request)
    {
       
        $data = $request->all();

        return Inertia::render('Employee/EditScreen', [
            'employeedata' => $data
        ]);

    }

    public function update(Request $request)
    {
       
        $user = User::findOrFail($request->id);
        
        $user->update($request->all());

        return redirect(route('EmployeeMaster', absolute: false));

    }

    public function delete(Request $request)
    {
       
        $user = User::findOrFail($request->id);
        
        $user->delete();

        return redirect(route('EmployeeMaster', absolute: false));

    }
}

