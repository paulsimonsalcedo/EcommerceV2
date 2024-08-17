<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AdminService{

    public function adminLoginService(array $data)
    {
        return Auth::guard('admin')->attempt([
            'email' => $data['adminEmail'],
            'password' => $data['adminPassword'],
        ]);
    }

    public function adminLogoutService()
    {
        Auth::guard('admin')->logout();
        Session::regenerateToken();
        Session::invalidate();
    }

    public function saveCategory($data)
    {
        $ProductCategory = new ProductCategory();
        $ProductCategory->category_name = $data['category'];
        if($ProductCategory->save()){
            return true;
        }
        return false;
    }

    public function getCategories()
    {
       $allCategories =  ProductCategory::all();
        return response()->json($allCategories);
    }

    public function saveProduct(array $data)
    {
        
        if(isset($data['image'])){
            $imagePath = $data['image']->store('public/products');
            $data['image'] = basename($imagePath);
        }

        return Product::create([
            'category_id' => $data['selectedItem'],
            'product_name' => $data['ProductName'],
            'description' => $data['Description'],
            'image' => $data['image'] ?? null, // Save image path or null
            'price' => $data['price'],
        ]);
    }

    public function getProducts()
    {
        $products = Product::paginate(5);
        return response()->json($products);
    }
}
