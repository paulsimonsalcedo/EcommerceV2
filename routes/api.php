<?php

use App\Http\Controllers\AdminController;
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
Route::post('/admin/login', [AdminController::class, 'adminLogin']);
Route::post('/admin/logout',[AdminController::class, 'adminLogout']);
Route::post('/admin/saveCategory', [AdminController:: class, 'saveCategory']);
Route::post('/admin/saveProduct', [AdminController::class, 'saveProduct']);
Route::get('/admin/getCategories',[AdminController::class, 'getCategories']);
Route::get('admin/getProducts', [AdminController::class,'getProducts']);
