<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class MemberStoreRequest extends FormRequest
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
            'member_id' => ['required', 'integer', 'min:1', 'unique:members,member_id'],
            'name' => ['required', 'string', 'max:255'],
            'phonetic_reading' => ['required', 'string', 'max:255'],
            'gender' => ['required'],
            'birthday' => ['required', 'date', 'before:today'],
            'start_date' => ['required', 'date', 'before_or_equal:end_date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
        ];
    }
}
