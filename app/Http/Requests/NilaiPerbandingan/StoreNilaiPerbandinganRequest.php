<?php

namespace App\Http\Requests\NilaiPerbandingan;

use Illuminate\Foundation\Http\FormRequest;

class StoreNilaiPerbandinganRequest extends FormRequest
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
            'perbandingan' => ['required', 'array'],
            'perbandingan.*.id_kriteria_1' => ['required', 'uuid', 'exists:tb_kriteria,id'],
            'perbandingan.*.id_kriteria_2' => ['required', 'uuid', 'exists:tb_kriteria,id', 'different:perbandingan.*.id_kriteria_1'],
            'perbandingan.*.nilai' => ['required', 'numeric', 'min:1', 'max:9'],
        ];
    }
}
