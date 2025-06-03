<?php

namespace App\Http\Controllers;

use App\Models\TutoringSubject;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class TutoringSubjectController extends Controller
{
    // Retrieve all tutoring subjects public
    public function publicIndex(): JsonResponse
    {
        $tutoringSubjects = TutoringSubject::select('id', 'title', 'slug', 'description', 'tutor_id')
            ->with(['tutor:id,first_name,last_name'])
            ->withCount('topicAreas')->get();
        return response()->json($tutoringSubjects, 200);
    }

    // Retrieve all tutoring subjects for tutor
    public function tutorIndex(): JsonResponse
    {
        $user = auth()->user();
        $tutoringSubjects = TutoringSubject::select('id', 'title', 'slug')
            ->where('tutor_id', $user->id)
            ->withCount('topicAreas')
            ->get();
        return response()->json($tutoringSubjects, 200);
    }

    // This method is not needed based on current task requirements
    // Retrieve tutoring subject by id
    public function findById(int $id): JsonResponse
    {
        $tutoringSubject = TutoringSubject::where('id', $id)->first()->with('tutor')->first();
        return $tutoringSubject != null
            ? response()->json($tutoringSubject, 200)
            : response()->json(['message' => 'Tutoring subject not found'], 404);
    }

    // Retrieve tutoring subject with stats and topic areas by slug
    public function showPublicDetailsBySlug(string $tutoringSubjectSlug): JsonResponse
    {
        $tutoringSubject = TutoringSubject::select('id', 'title', 'slug')
            ->where('slug', $tutoringSubjectSlug)
            ->with([
                'topicAreas' => function ($query) {
                    $query
                        ->select('title', 'slug', 'description', 'tutoring_subject_id')
                        ->withCount([
                            'tutoringSessions as available_tutoring_sessions_count' => function ($query) {
                                $query->where('status', 'available');
                            }
                        ])
                        ->withMin([
                            'tutoringSessions as lowest_price' => function ($query) {
                                $query->where('status', 'available');
                            }
                        ], 'price');
                }
            ])->where('slug', $tutoringSubjectSlug)->first();

        return $tutoringSubject != null
            ? response()->json($tutoringSubject, 200)
            : response()->json(['message' => 'Tutoring subject by slug not found'], 404);
    }

    // Retrieve tutoring subject with stats and topic areas by slug for tutor
    public function showTutorDetailsBySlug(string $tutoringSubjectSlug): JsonResponse
    {
        $user = auth()->user();
        $tutoringSubject = TutoringSubject::select('id', 'title', 'slug')
            ->where('slug', $tutoringSubjectSlug)
            ->where('tutor_id', $user->id)
            ->with([
                'topicAreas' => function ($query) {
                    $query
                        ->select('id', 'title', 'description', 'tutoring_subject_id', 'slug')
                        ->withCount([
                            'tutoringSessions as requested_tutoring_sessions_count' => function ($query) {
                                $query->where('status', 'requested');
                            }
                        ])
                        ->withCount([
                            'tutoringSessions as available_tutoring_sessions_count' => function ($query) {
                                $query->where('status', 'available');
                            }
                        ])
                        ->withCount([
                            'tutoringSessions as booked_tutoring_sessions_count' => function ($query) {
                                $query->where('status', 'booked')
                                    ->where('start_time', '>', now());
                            }
                        ])
                        ->withCount([
                            'tutoringSessions as pending_confirmation_tutoring_sessions_count' => function ($query) {
                                $query->where('status', 'booked')
                                    ->where('start_time', '<', now());
                            }
                        ])
                        ->withCount([
                            'tutoringSessions as completed_tutoring_sessions_count' => function ($query) {
                                $query->where('status', 'completed');
                            }
                        ]);
                }
            ])->first();

        return $tutoringSubject != null
            ? response()->json($tutoringSubject, 200)
            : response()->json(['message' => 'Tutoring subject not found'], 404);
    }


    // This method is not needed based on current task requirements
    // Save a new tutoring subject
    public function saveForTutor(Request $request): JsonResponse
    {
        DB::beginTransaction();

        try {
            $tutoringSubject = TutoringSubject::create($request->all());
            DB::commit();
            return response()->json($tutoringSubject, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Saving tutoring subject failed', $e->getMessage()], 500);
        }
    }

    // This method is not needed based on current task requirements
    // Update an existing tutoring subject
    public function updateForTutor(Request $request, int $id): JsonResponse
    {
        DB::beginTransaction();

        try {
            $tutoringSubject = TutoringSubject::where('id', $id)->first();
            if ($tutoringSubject != null) {
                if (!Gate::allows('own-tutoring-subject', $tutoringSubject)) {
                    return response()->json(['message' => 'You are not allowed to update this tutoring subject!'], 403);
                }
                $tutoringSubject->update($request->all());
                DB::commit();
                return response()->json($tutoringSubject, 200);
            } else {
                return response()->json(['message' => 'Tutoring subject not found'], 404);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Updating tutoring subject failed', $e->getMessage()], 500);
        }
    }

    // This method is not needed based on current task requirements
    // Delete tutoring subject
    public function deleteForTutor(int $id): JsonResponse
    {
        DB::beginTransaction();
        $tutoringSubject = TutoringSubject::where('id', $id)->first();

        if ($tutoringSubject != null) {
            if (!Gate::allows('own-tutoring-subject', $tutoringSubject)) {
                return response()->json(['message' => 'You are not allowed to delete this tutoring subject!'], 403);
            }
            $tutoringSubject->delete();
            DB::commit();
            return response()->json('Tutoring subject with id ' . $id . ' deleted', 200);
        } else {
            return response()->json(['message' => 'Tutoring subject with id ' . $id . ' not found!'], 404);
        }
    }
}

