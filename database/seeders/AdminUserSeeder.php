<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //default admin
        Admin::create([
            'email' => 'paulsimonsalcedo@gmail.com',
            'password' => Hash::make('password123'),
        ]);
    }
}
