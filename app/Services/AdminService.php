<?php

namespace App\Services;

use App\Models\Admin;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

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

    public function getProducts($category_id = null)
    {
        if($category_id && $category_id !== 'all')
        {
            return Product::with('category')->where('category_id', $category_id)->paginate(5);
        }
        return Product::with('category')->paginate(5);
    }

    public function deleteProduct($id)
    {
        $product = Product::findOrFail($id)->delete();
        if($product)
        {
            return response()->json(["message" => "Product Successfully deleted"]);
        }
        return response()->json(["message" => "Can't Delete Product"]);
    }

    public function getUsers()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function editAdmin(array $data)
    {
        $admin = Admin::find(1);

        if (!$admin) {
            return false;
        }
    
        // Handle image upload
        if (isset($data['AdminImage'])) {
            // Delete old image if it exists
            if ($admin->image) {
                Storage::delete('public/admin/' . $admin->image);
            }
    
            // Store the new image
            $imagePath = $data['AdminImage']->store('public/admin');
            $admin->image = basename($imagePath);
        }

        $admin->email = $data['email']; 
    
        // Update password only if provided
        if (!empty($data['password'])) {
            $admin->password = bcrypt($data['password']);
        }
    

        return $admin->save();
    }
}
