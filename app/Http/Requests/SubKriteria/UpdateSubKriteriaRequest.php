<?php

namespace App\Http\Requests\SubKriteria;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSubKriteriaRequest extends FormRequest
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
            'id_kriteria' => ['required', 'exists:tb_kriteria,id'],
            'nama' => ['required', 'string', 'max:255'],
            'nilai' => ['required'],
        ];
    }
}
