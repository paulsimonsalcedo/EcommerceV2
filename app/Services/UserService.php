<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class UserService
{
    public function create(array $data)
    {
        return User::create([
            'name' => $data['username'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    public function login(array $credentials)
    {
        if(Auth::attempt($credentials))
        {
            Session::regenerate();
            return true;
        }
        return false;
    }

    public function logout()
    {
        Auth::logout();
        Session::regenerateToken();
        Session::invalidate();
    }
}