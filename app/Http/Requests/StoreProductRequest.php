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
            'selectedItem' => 'required|exists:product_categories,id',
            'ProductName' => 'required|string|max:255',
            'Description' => 'required|string|max:1000',
            'image' => 'required|image|max:2048',
            'price' => 'required|numeric|min:0',
        ];
    }
}
