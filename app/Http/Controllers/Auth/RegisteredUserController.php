<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'employee_id' => 'required|integer|unique:users,employee_id',
            'name' => 'required|string|max:255',
            // 'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
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

        
        event(new Registered($user));

        Auth::login($user);

        return redirect(route('Home', absolute: false));
    }

    public function employeestore(Request $request): RedirectResponse
    {
       

        $user = User::create([
            'name' => $request->name,
            'phonetic_reading'=> $request->phonetic_reading,
            'employee_id' => $request->employee_id,
            'password' => Hash::make($request->password),
            'email'=> $request->email,
            'type'=> $request->type,
            'status'=> $request->status,
        ]);


        return redirect(route('Home', absolute: false));
    }
}
