<?php

namespace App\Http\Requests\SyaratTanam;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSyaratTanamRequest extends FormRequest
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
            'id_tanaman' => ['required', 'exists:tb_tanaman,id'],
            'id_kriteria' => ['required', 'exists:tb_kriteria,id'],
            'id_sub_kriteria' => ['required', 'exists:tb_sub_kriteria,id'],
            'nilai' => ['required', 'numeric', 'between:0,1'],
        ];
    }
}
