<?php

namespace App\Http\Requests\Lahan;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLahanRequest extends FormRequest
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
            'nama' => ['required', 'string', 'max:255'],
            'lokasi' => ['required', 'string'],
            'luas' => ['required', 'numeric', 'min:0'],
            'kriteria' => ['required', 'array', 'min:1'],
            'kriteria.*.id_kriteria' => ['required', 'exists:tb_kriteria,id'],
            'kriteria.*.id_sub_kriteria' => ['required', 'exists:tb_sub_kriteria,id'],
        ];
    }
}
