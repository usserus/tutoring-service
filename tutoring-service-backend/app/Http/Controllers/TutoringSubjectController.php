<?php

namespace App\Http\Controllers;

use App\Models\TutoringSubject;
use Illuminate\Http\JsonResponse;

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
}

