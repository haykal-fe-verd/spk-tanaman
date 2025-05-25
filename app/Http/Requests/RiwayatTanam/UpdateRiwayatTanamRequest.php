<?php

namespace App\Http\Requests\RiwayatTanam;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRiwayatTanamRequest extends FormRequest
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
            'id_lahan' => ['required', 'exists:tb_lahan,id'],
            'id_tanaman' => ['required', 'exists:tb_tanaman,id'],
            'tanggal_tanam' => ['required', 'date'],
            'tanggal_panen' => ['required', 'date'],
            'tanggal_istirahat' => ['required', 'date'],
            'kriteria' => ['required', 'array', 'min:1'],
            'kriteria.*.id_kriteria' => ['required', 'exists:tb_kriteria,id'],
            'kriteria.*.id_sub_kriteria' => ['required', 'exists:tb_sub_kriteria,id'],
        ];
    }
}
