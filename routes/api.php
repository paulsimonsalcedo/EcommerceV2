<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminSettingsController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/signup', [UserController::class, 'store']);
Route::post('/signin', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout']);


Route::middleware(['auth:sanctum'])->group(function (){
    Route::post('/addtoCart', [CartController::class, 'addtoCart']);
    Route::get('/getCartList', [CartController:: class, 'getCart']);
    Route::get('/totalCart', [CartController::class, 'totalCart']);
});

Route::post('/admin/login', [AdminController::class, 'adminLogin']);
Route::post('/admin/logout',[AdminController::class, 'adminLogout']);
Route::post('/admin/saveCategory', [AdminController:: class, 'saveCategory']);
Route::post('/admin/saveProduct', [AdminController::class, 'saveProduct']);
Route::get('/admin/getCategories',[AdminController::class, 'getCategories']);
Route::get('/admin/getProducts', [AdminController::class, 'getProducts']);
Route::post('/admin/deleteProduct', [AdminController::class, 'deleteProduct']);
Route::get('/admin/getUsers', [AdminController::class, 'getUsers']);
Route::post('/admin/editAdmin', [AdminController::class, 'editAdmin']);
Route::get('/admin/getAdminCredentials', [AdminSettingsController::class, 'getAdminCredentials']);