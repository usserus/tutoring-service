<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\TopicArea;
use App\Models\TutoringSession;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TutoringSessionController extends Controller
{
    // Retrieve all tutoring sessions for a student
    public function studentIndex(): JsonResponse
    {
        $user = auth()->user();
        $tutoringSessions = TutoringSession::select('topic_area_id', 'student_id', 'tutor_id', 'start_time', 'duration', 'location_id', 'price', 'status')
            ->where('student_id', $user->id)
            ->with([
                'topicArea:id,title',
                'tutor:id,first_name,last_name',
                'location:id,street,house_number,postal_code,city,country',
            ])
            ->get();
        return response()->json($tutoringSessions, 200);
    }

    // Save a new tutoring session for a student
    public function saveForStudent(Request $request): JsonResponse
    {
        DB::beginTransaction();

        try {
            $request = $this->parseRequest($request);
            $startTime = new \DateTime($request->start_time);
            $now = new \DateTime();

            if ($startTime < $now) {
                return response()->json(['message' => 'Der Termin darf nicht in der Vergangenheit liegen.'], 422); // Status code 422 Unprocessable Content
            }

            $tutoringSession = new TutoringSession();
            $tutoringSession->student_id = auth()->user()->id; // currently authenticated user is the student
            $tutoringSession->start_time = $request->start_time;
            $tutoringSession->duration = $request->duration;
            $tutoringSession->price = $request->price;
            $tutoringSession->status = 'requested'; // default always 'requested' for student-initiated sessions
            $this->assignTopicAreaTutorAndLocation($request, $tutoringSession);

            $tutoringSession->save();
            DB::commit();
            return response()->json($tutoringSession, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error saving tutoring session: ' . $e->getMessage()], 500);
        }
    }

    // Update tutoring session for a student
    public function updateForStudent(Request $request): JsonResponse
    {
        DB::beginTransaction();

        try {
            $tutoringSession = TutoringSession::where('id', $request->id)->first();

            if ($tutoringSession != null) {
                $tutoringSession->status = 'requested'; // always set to 'requested' for student-initiated sessions
                $tutoringSession->student_id = $request->student_id;
                $tutoringSession->save();
                DB::commit();
                return response()->json($tutoringSession, 200);

            } else {
                return response()->json(['message' => 'Tutoring session with ' . $request->id . ' not found!'], 404);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Updating tutoring session status failed', $e->getMessage()], 500);
        }
    }

    // Update tutoring session for a tutor
    public function updateForTutor(Request $request, string $id): JsonResponse
    {
        DB::beginTransaction();

        try {
            $tutoringSession = TutoringSession::where('id', $id)->first();

            if ($tutoringSession != null) {
                $tutoringSession->update($request->all());
                DB::commit();
                return response()->json($tutoringSession, 200);

            } else {
                return response()->json(['message' => 'Tutoring session with ' . $id . ' not found!'], 404);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Updating tutoring session failed', $e->getMessage()], 500);
        }
    }

    // Assign the topic area, tutor, and location to the tutoring session
    private function assignTopicAreaTutorAndLocation(Request $request, TutoringSession $tutoringSession): void
    {
        if (isset($request['topic_area_id'])) {
            $topicArea = TopicArea::with('tutor')->find($request['topic_area_id']);
            if (!$topicArea || !$topicArea->tutor) {
                throw new \Exception("Topic area or associated tutor not found.");
            }
            $tutoringSession->topic_area_id = $topicArea->id;
            $tutoringSession->tutor_id = $topicArea->tutor->id;
        } else {
            throw new \Exception("topic_area_id is required.");
        }

        // Handling location: check if a new location is provided
        if (isset($request['location'])) {
            // Check if location data exists
            $locationData = $request['location'];
            $location = Address::firstOrNew([
                'street' => $locationData['street'],
                'house_number' => $locationData['house_number'],
                'postal_code' => $locationData['postal_code'],
                'city' => $locationData['city'],
                'country' => $locationData['country'],
            ]);
            // Save the new location if it's not already in the database
            if (!$location->exists) {
                $location->save();
            }
            $tutoringSession->location_id = $location->id;
        }
    }

    // Parse the request to format the start_time correctly
    private function parseRequest(Request $request): Request
    {
        $date = new \DateTime($request->start_time);
        $request['start_time'] = $date->format('Y-m-d H:i:s');
        return $request;
    }
}
