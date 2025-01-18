<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Product;

class CartService{

    public function AddToCart($product_id)
    {
        $user = auth()->user();
        $product= Product::findOrFail($product_id);
        $checkProductExist = Cart::where('user_id', $user->id)->where('product_id', $product_id)->first();

        if($checkProductExist){
            return false;
        }


        return Cart::create([
            'user_id' => $user->id,
            'product_id' => $product->id,
        ]);

    }

    public function getCartList()
    {
        $user = auth()->user()->id;
        $cart = Cart::where('user_id', $user)->with('product')->get();
        return response()->json([$cart]);
    }

    public function getTotalCart()
    {
        $user = auth()->user();
        $totalCart = Cart::where('user_id', $user->id)->count();

        return response()->json(['count' => $totalCart]);
    }
}