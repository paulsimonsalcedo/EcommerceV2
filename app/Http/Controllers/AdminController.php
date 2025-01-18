<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminUserRequest;
use App\Http\Requests\EditAdminRequest;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\StoreProductRequest;
use App\Services\AdminService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    protected $adminService;

    public function __construct(AdminService $adminService)
    {
        $this->adminService = $adminService;
    }

    public function adminLogin(AdminUserRequest $request)
    {

        $validatedAdmin = $request->only('adminEmail', 'adminPassword');
        
        if ($this->adminService->adminLoginService($validatedAdmin)) {
            $admin = Auth::guard('admin')->user();
            $token = $admin->createToken('authToken')->plainTextToken;
            return response()->json(['message' => 'Successful login', 'token' => $token], 200);
        }

        return response()->json(['message' => 'Wrong Credentials'], 401);
    }

    public function adminLogout()
    {
        $this->adminService->adminLogoutService();
        return response()->json(['status' => 200]);
    }

    public function saveCategory(StoreCategoryRequest $request)
    {
        $validated = $request->validated();
        if($this->adminService->saveCategory($validated)){
            return response()->json(['message' => 'Successfully Saved'], 200);
        }
    }

    public function getCategories()
    {
        return $this->adminService->getCategories();
    }
    
    public function saveProduct(StoreProductRequest $request)
    {
        $validated = $request->validated();
        if($this->adminService->saveProduct($validated)){
            return response()->json(['message' => 'Product Successfully Saved']);
        }
        return response()->json(['message' => 'Error']);
    }

    public function getProducts(Request $request)
    {
        $category_id = $request->query('category_id');
        $result = $this->adminService->getProducts($category_id);
        return response()->json($result);
    }

    public function deleteProduct(Request $request)
    {
        return $this->adminService->deleteProduct($request->deleteID);
    }

    public function getUsers()
    {
        return $this->adminService->getUsers();
    }

    public function editAdmin(EditAdminRequest $request)
    {
        $validated = $request->validated();

        if ($this->adminService->editAdmin($validated)) {
            return response()->json(['message' => 'Credential Saved'], 200);
        } 
        
        return response()->json(['message' => 'Credential Cannot be Saved'], 500);
        
    }

}
