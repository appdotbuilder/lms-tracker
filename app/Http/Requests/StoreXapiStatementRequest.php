<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreXapiStatementRequest extends FormRequest
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
            'id' => 'required|string|uuid',
            'actor.mbox' => 'required|string|regex:/^mailto:.+@.+\..+$/',
            'actor.name' => 'sometimes|string',
            'verb.id' => 'required|string',
            'verb.display' => 'sometimes|array',
            'object.id' => 'required|string',
            'object.definition.name' => 'sometimes|array',
            'timestamp' => 'sometimes|date',
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
            'id.required' => 'Statement ID is required.',
            'id.uuid' => 'Statement ID must be a valid UUID.',
            'actor.mbox.required' => 'Actor email (mbox) is required.',
            'actor.mbox.regex' => 'Actor mbox must be a valid email address in mailto: format.',
            'verb.id.required' => 'Verb ID is required.',
            'object.id.required' => 'Object ID is required.',
        ];
    }
}