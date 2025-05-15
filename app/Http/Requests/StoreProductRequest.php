<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'name' => ['required'],
            'barcode' => ['nullable','unique:products'],
            'brand_id' => ['nullable','numeric'],
            'image' => ['nullable','image','mimes:png,jpg,jpeg'],
            'description' => ['nullable'],
            'price'=> ['required','numeric'],
            'cost'=> ['required','numeric'],
            'shop_id' => ['nullable','numeric'],
            'category_id' => ['nullable','numeric'],
            'unit_id' => ['nullable','numeric'],
            'cases' => ['required','numeric'],
            'units' => ['nullable','numeric'],
        ];
    }
}
