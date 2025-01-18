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
    Route::view('/login', 'components.layout')->name('login');
    Route::view('/signup', 'components.layout')->name('signup');

    Route::middleware('auth')->group(function () {
        // Return the main layout for all authenticated user routes
        Route::get('/{any}', function () {
            return view('components.layout');
        })->where('any', '^(?!admin).*$');  // Exclude admin routes
    });

    Route::view('/admin/login', 'components.layout')->name('admin.login');

    Route::middleware('admin')->group(function () {
        // Return the main layout for all admin routes
        Route::get('/admin/{any}', function () {
            return view('components.layout');
        })->where('any', '.*');  // Catch all admin routes
    });
    
});
