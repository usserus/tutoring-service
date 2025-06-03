<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    // Retrieve all users with first and last name for tutor
    public function tutorIndex(): JsonResponse
    {
        $users = User::select('id', 'first_name', 'last_name')
            ->get();
        return response()->json($users, 200);
    }
}
