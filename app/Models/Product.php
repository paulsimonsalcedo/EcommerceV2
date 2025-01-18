<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'product_name',
        'description',
        'image',
        'price'
    ];

    public function category()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }
}
