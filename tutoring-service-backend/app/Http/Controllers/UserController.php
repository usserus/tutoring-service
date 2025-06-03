<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Retrieve all users with first and last name for tutor
    public function tutorIndex(): JsonResponse
    {
        $users = User::select('id', 'first_name', 'last_name')
            ->get();
        return response()->json($users, 200);
    }

    // This method is not needed based on current task requirements
    // Retrieve user by id with address
    public function findById(int $id): JsonResponse
    {
        $user = User::where('id', $id)->with('address')->first();
        return $user != null
            ? response()->json($user, 200)
            : response()->json(['message' => 'User not found'], 404);
    }
}
