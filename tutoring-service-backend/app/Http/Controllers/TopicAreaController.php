<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\TopicArea;
use App\Models\TutoringSession;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class TopicAreaController extends Controller
{
    // Retrieve topic area with stats and tutoring sessions by slug
    public function showPublicDetailsBySlug(string $topicAreaSlug): JsonResponse
    {
        $topicArea = TopicArea::select('id', 'tutoring_subject_id', 'title', 'slug', 'description', 'tutor_id', 'created_at')
            ->where('slug', $topicAreaSlug)
            ->with([
                'tutoringSubject:id,title',
                'tutor:id,first_name,last_name',
                'tutoringSessions' => function ($query) { // scopeWithAvailableTutoringSessions in TopicArea model
                    $query->where('status', 'available')
                        ->orderBy('start_time', 'asc')
                        ->select('id', 'topic_area_id', 'location_id', 'start_time', 'duration', 'price', 'status')
                        ->with([
                            'location:id,street,house_number,postal_code,city,country',
                        ]);
                }
            ])
            ->withMin([ // scopeWithLowestPrice in TopicArea model
                'tutoringSessions as lowest_price' => function ($query) {
                    $query->where('status', 'available');
                }
            ], 'price')
            ->first();
        return $topicArea != null
            ? response()->json($topicArea, 200)
            : response()->json(['message' => 'Topic area not found'], 404);
    }

    // Retrieve tutor topic area with stats and tutoring sessions by slug
    public function showTutorDetailsBySlug(string $tutoringSubjectSlug): JsonResponse
    {
        $user = auth()->user();
        $topicArea = TopicArea::select('id', 'title', 'slug', 'description', 'tutoring_subject_id')
            ->where('slug', $tutoringSubjectSlug)
            ->where('tutor_id', $user->id)
            ->withCount([
                'tutoringSessions as requested_count' => function ($query) {
                    $query->where('status', 'requested');
                }
            ])
            ->withSum([
                'tutoringSessions as turnover_completed_sessions' => function ($query) {
                    $query->where('status', 'completed');
                },
                'tutoringSessions as turnover_requested_sessions' => function ($query) {
                    $query->where('status', 'requested');
                }], 'price')
            ->with([
                'tutoringSessions' => function ($query) {
                    $query->select('id', 'topic_area_id', 'student_id', 'location_id', 'start_time', 'duration', 'price', 'status', 'created_at')
                        ->with([
                            'student:id,first_name,last_name',
                            'location:id,street,house_number,postal_code,city,country',
                        ])
                        ->get();
                },
            ])
            ->first();
        return $topicArea != null
            ? response()->json($topicArea, 200)
            : response()->json(['message' => 'Topic area not found'], 404);
    }

    // Save a new topic area with tutoring sessions
    public function saveForTutor(Request $request): JsonResponse
    {
        DB::beginTransaction();

        try {
            $request = $this->parseRequest($request);
            $topicArea = TopicArea::create($request->all());

            if (isset($request["tutoring_sessions"]) && is_array($request["tutoring_sessions"])) {
                foreach ($request["tutoring_sessions"] as $tutoringSessionData) {
                    $this->createOrUpdateTutoringSession($tutoringSessionData, $topicArea);
                }
            }

            DB::commit();
            return response()->json($topicArea, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Saving topic area failed', $e->getMessage()], 500);
        }
    }

    // Update an existing topic area with tutoring sessions
    public function updateForTutor(Request $request, int $id): JsonResponse
    {
        DB::beginTransaction();

        try {
            $request = $this->parseRequest($request);
            $topicArea = TopicArea::where('id', $id)->first();
            if ($topicArea != null) {
                if (!Gate::allows('own-topic-area', $topicArea)) {
                    return response()->json(['message' => 'You are not allowed to update this topic area!'], 403);
                }
                $topicArea->update($request->all());

                if (isset($request["tutoring_sessions"]) && is_array($request["tutoring_sessions"])) {
                    foreach ($request["tutoring_sessions"] as $tutoringSessionData) {
                        if (isset ($tutoringSessionData['id'])) {
                            $tutoringSession = TutoringSession::find($tutoringSessionData['id']);
                            if ($tutoringSession) {
                                $this->createOrUpdateTutoringSession($tutoringSessionData, $topicArea, $tutoringSession);
                            }
                        } else {
                            $this->createOrUpdateTutoringSession($tutoringSessionData, $topicArea);
                        }
                    }
                }
                DB::commit();
                return response()->json($topicArea, 200);
            } else {
                return response()->json(['message' => 'Topic area not found'], 404);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Updating topic area failed', $e->getMessage()], 500);
        }
    }

    // Helper function to parse request and format start_time
    private function parseRequest(Request $request): Request
    {
        if ($request->has('tutoring_sessions') && is_array($request->tutoring_sessions)) {
            $sessions = $request->tutoring_sessions;
            foreach ($sessions as $key => $session) {
                if (isset($session['start_time']) && !empty($session['start_time'])) {
                    $date = new \DateTime($session['start_time']);
                    $sessions[$key]['start_time'] = $date->format('Y-m-d H:i:s');
                }
            }
            $request->merge(['tutoring_sessions' => $sessions]); // source https://laravel.com/docs/11.x/collections#method-merge
        }
        return $request;
    }

    // Helper function to create or update a tutoring session
    private function createOrUpdateTutoringSession(array $tutoringSessionData, TopicArea $topicArea, ?TutoringSession $tutoringSession = null): TutoringSession
    {
        if ($tutoringSession === null) {
            $tutoringSession = new TutoringSession();
        }

        $tutoringSession->topic_area_id = $topicArea->id;
        $tutoringSession->tutor_id = auth()->user()->id;
        $tutoringSession->student_id = $tutoringSessionData['student_id'] ?? null;
        $tutoringSession->start_time = $tutoringSessionData['start_time'];
        $tutoringSession->duration = $tutoringSessionData['duration'];

        $locationData = $tutoringSessionData['location'];
        $address = Address::firstOrNew([
            'street' => $locationData['street'],
            'house_number' => $locationData['house_number'],
            'postal_code' => $locationData['postal_code'],
            'city' => $locationData['city'],
            'country' => $locationData['country'],
        ]);
        $address->save();

        $tutoringSession->location_id = $address->id;
        $tutoringSession->price = $tutoringSessionData['price'] ?? null;
        $tutoringSession->status = $tutoringSessionData['status'] ?? 'available';

        if (!$tutoringSession->exists) { // exists from Eloquent Model https://neutrondev.com/exists-vs-exists-whats-the-difference-in-laravel/
            $topicArea->tutoringSessions()->save($tutoringSession);
        } else {
            $tutoringSession->save();
        }

        return $tutoringSession;
    }
}
