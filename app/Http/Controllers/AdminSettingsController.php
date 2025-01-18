<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;

class AdminSettingsController extends Controller
{
    public function getAdminCredentials()
    {
        $getAdmin = Admin::find(1);
        return $getAdmin;
    }
}
