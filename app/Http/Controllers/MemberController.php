<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Member;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;


class MemberController extends Controller
{
    //
    public function index()
    {
        $member = Member::all();
        
        return response()->json($member);
    }

    public function store(Request $request): RedirectResponse
    {
       
        $request->validate([
            'member_id' => 'required|numeric|unique:members,member_id',
        ]);

        $user = Member::create([
            'name' => $request->name,
            'phonetic_reading'=> $request->phonetic_reading,
            'member_id' => $request->member_id,
            'gender' => $request->gender,
            'birthday'=> $request->birthday,
            'start_date'=> $request->start_date,
            'end_date'=> $request->end_date,
        ]);


        return redirect(route('MemberMaster', absolute: false));
    }


    public function confirmation(Request $request)
    {
       

        $data = $request->all();


        return Inertia::render('Member/ConfirmationScreen', [
            'memberdata' => $data,
            'url' => '/member-register',
            'btn' => '登録',
            'heading' => 'メンバー情報登録の確認'
        ]);

    }

    public function updateconfirmation(Request $request)
    {
       

        $data = $request->all();

        return Inertia::render('Member/ConfirmationScreen', [
            'memberdata' => $data,
            'url' => '/member-update',
            'btn' => '更新',
            'heading' => 'メンバー情報更新の確認'
        ]);

    }

    public function deleteconfirmation(Request $request)
    {
       

        $data = $request->all();

        return Inertia::render('Member/ConfirmationScreen', [
            'memberdata' => $data,
            'url' => '/member-delete',
            'btn' => '削除',
             'heading' => 'メンバー情報削除の確認'
        ]);

    }

    public function edit(Request $request)
    {
       
        $data = $request->all();

        return Inertia::render('Member/EditScreen', [
            'memberdata' => $data
        ]);

    }

    public function update(Request $request): RedirectResponse
    {
       
        $member = Member::findOrFail($request->id);
        
        $member->update($request->all());

        return redirect(route('MemberMaster', absolute: false));

    }

    public function delete(Request $request): RedirectResponse
    {
       
        $member = Member::findOrFail($request->id);
        
        $member->delete();

        return redirect(route('MemberMaster', absolute: false));

    }
}
