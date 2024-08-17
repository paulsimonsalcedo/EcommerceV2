<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::middleware('web')->group(function () {
    Route::redirect('/', '/login');
    Route::view('/login', 'auth.login')->name('login');
    Route::view('/signup', 'auth.signup')->name('signup');
    
    Route::middleware('auth')->group(function () {
        Route::view('/dashboard', 'dashboard.index')->name('dashboard');
        Route::view('/about', 'dashboard.about')->name('about');
        Route::view('/product', 'dashboard.product')->name('product');
        Route::view('/contact', 'dashboard.contact')->name('contact');
    });

    Route::view('/admin/login', 'admin.adminLogin')->name('admin.login');

    Route::middleware('admin')->group(function(){
        Route::view('/admin/dashboard', 'admin.adminDashboard');
        Route::view('/admin/dashboard/products', 'admin.product');
        Route::view('/admin/dashboard/settings', 'admin.setting');
        Route::view('/admin/dashboard/orders', 'admin.order');
        Route::view('/admin/dashboard/users', 'admin.user');
        Route::view('/admin/dashboard/ProductList', 'admin.productlist');
    });
});