<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EmployeeUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
            'employee_id' => [
                'required',
                'integer',
                'min:1',
                Rule::unique('users', 'employee_id')->ignore($this->input('id')), // ← 自分のIDを除外
            ],
            'name' => ['required', 'string', 'max:255'],
            'phonetic_reading' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($this->input('id')),
            ],
            'type' => ['required', 'string', 'max:50'],
            'status' => ['required', 'boolean'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'password_confirmation' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }
}
