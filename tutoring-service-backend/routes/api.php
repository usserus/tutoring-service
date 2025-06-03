<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TopicAreaController;
use App\Http\Controllers\TutoringSessionController;
use App\Http\Controllers\TutoringSubjectController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

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

// Naming convention for routes:
// https://laracasts.com/discuss/channels/code-review/naming-conventions-from-routes-to-controller-methods

// - public routes: public/{resource}
// - authenticated user routes: student/{resource}
// - authenticated tutor routes: tutor/{resource}
// - index: gives a list of resources
// - show: gives details of a single resource

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Authentication Routes
Route::post('auth/login', [AuthController::class, 'login']);


// **** Public available routes ****
// TutoringSubject Routes
Route::get('public/tutoring-subjects', [TutoringSubjectController::class, 'publicIndex']);
Route::get('public/tutoring-subjects/{tutoringSubjectSlug}', [TutoringSubjectController::class, 'showPublicDetailsBySlug']);

// TopicArea Routes
Route::get('public/topic-areas/{topicAreaSlug}', [TopicAreaController::class, 'showPublicDetailsBySlug']);


// **** Routes available only for authenticated users ****
Route::group(['middleware' => ['api', 'auth.jwt']], function () {
    Route::post('auth/logout', [AuthController::class, 'logout']);

    // TutoringSession Routes
    Route::get('student/tutoring-sessions', [TutoringSessionController::class, 'studentIndex']);
    Route::post('student/tutoring-sessions', [TutoringSessionController::class, 'saveForStudent']);
    Route::put('student/tutoring-sessions/{id}', [TutoringSessionController::class, 'updateForStudent']);
});


// **** Routes available only for authenticated tutors ****
Route::group(['middleware' => ['api', 'auth.jwt', 'auth.isTutor']], function () {

    // User Routes
    Route::get('tutor/users', [UserController::class, 'tutorIndex']);

    // TutoringSubject Routes
    Route::get('tutor/tutoring-subjects', [TutoringSubjectController::class, 'tutorIndex']);
    Route::get('tutor/tutoring-subjects/{tutoringSubjectSlug}', [TutoringSubjectController::class, 'showTutorDetailsBySlug']);

    // TopicArea Routes
    Route::get('tutor/topic-areas/{topicAreaSlug}', [TopicAreaController::class, 'showTutorDetailsBySlug']);
    Route::post('tutor/topic-areas', [TopicAreaController::class, 'saveForTutor']);
    Route::put('tutor/topic-areas/{id}', [TopicAreaController::class, 'updateForTutor']);

    // TutoringSession Routes
    Route::put('tutor/tutoring-sessions/{id}', [TutoringSessionController::class, 'updateForTutor']);
});
