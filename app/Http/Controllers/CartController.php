<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function addtoCart(Request $request)
    {

        $product = $request->input('product_id');

        if($this->cartService->AddToCart($product)){

            return response()->json(["message" => "Product added to your Cart"] , 200);

        }

        return response()->json(["message" => "Product Cannot add to cart"], 500);

    }

    public function getCart()
    {
        return $this->cartService->getCartList();
    }

    public function totalCart()
    {
        return $this->cartService->getTotalCart();
    }
}
