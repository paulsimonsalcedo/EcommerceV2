<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        return view('Dashboard.index');
    }

    public function store(StoreUserRequest $UserValidation)
    {
        $validatedData = $UserValidation->validated();
        $this->userService->create($validatedData);

        return response()->json(['message' => 'User created successfully'], 201);

    }

    public function login(LoginUserRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if ($this->userService->login($credentials)) {
            $token = auth()->user()->createToken('authToken')->plainTextToken;
            return response()->json(['token' => $token], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout()
    {
        $this->userService->logout();
        return response()->json(['status' => 200]);
    }

}
