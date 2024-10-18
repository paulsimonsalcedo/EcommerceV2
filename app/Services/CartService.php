<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Product;

class CartService{

    public function AddToCart($product_id)
    {
        $user = auth()->user();
        $product= Product::findOrFail($product_id);

        if($product){
            return Cart::create([
                'user_id' => $user->id,
                'product_id' => $product->id,
            ]);
        }

        return false;
    }

    public function getCartList()
    {
        $user = auth()->user()->id;
        $cart = Cart::where('user_id', $user)->with('product')->get();
        return response()->json([$cart]);
    }
}