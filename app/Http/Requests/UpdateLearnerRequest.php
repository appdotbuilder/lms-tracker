<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLearnerRequest extends FormRequest
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
        $learner = $this->route('learner');
        
        return [
            'learner_id' => 'required|string|max:255|unique:learners,learner_id,' . $learner->id,
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:learners,email,' . $learner->id,
            'phone' => 'nullable|string|max:20',
            'notes' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'learner_id.required' => 'Learner ID is required.',
            'learner_id.unique' => 'This learner ID is already in use by another learner.',
            'name.required' => 'Learner name is required.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email is already registered to another learner.',
            'status.required' => 'Please select a status.',
            'status.in' => 'Status must be either active or inactive.',
        ];
    }
}