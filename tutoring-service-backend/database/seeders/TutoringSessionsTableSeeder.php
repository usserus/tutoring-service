<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\TopicArea;
use App\Models\TutoringSession;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class TutoringSessionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = ['requested', 'available', 'booked', 'completed'];

        for ($i = 0; $i < 300; $i++) {
            $topicArea = TopicArea::inRandomOrder()->first();
            $tutor = $topicArea->tutor;
            // Get a random student who is not the same as the tutor https://laravel.com/docs/12.x/queries#random-ordering
            // The student can also be a tutor
            $student = User::where('id', '!=', $tutor->id)->inRandomOrder()->first();
            $address = Address::inRandomOrder()->first();

            $tutoringSession = new TutoringSession();
            $tutoringSession->topicArea()->associate($topicArea);
            $tutoringSession->tutor()->associate($tutor);
            $tutoringSession->student()->associate($student);
            // Random status
            $tutoringSession->status = $statuses[array_rand($statuses)];
            // Random start time based on the status
            $tutoringSession->start_time = $this->getRandomStartTimeForStatus($tutoringSession->status);
            // Random duration between 30 and 120 minutes
            $tutoringSession->duration = rand(30, 120);
            $tutoringSession->location()->associate($address);
            // Random price between 50 and 140
            $tutoringSession->price = rand(50, 140);
            // Available tutoring sessions can be requested by students
            if ($tutoringSession->status === 'available') {
                $tutoringSession->student()->dissociate();
            }

            $tutoringSession->save();
        }
    }

    // Get a random start time based on the status of the tutoring session
    // https://carbon.nesbot.com/docs/#api-addsub
    private function getRandomStartTimeForStatus(string $status): Carbon
    {
        // If the tutoring session is requested or available
        // -> Random start time from now two months in the future
        if ($status === 'requested' || $status === 'available') {
            return now()->addDays(rand(10, 60))->setTime(rand(8, 18), 0);
        }

        // If the tutoring session is booked or completed
        // -> Random start time from now two months ago or in the future
        if ($status === 'booked') {
            $days = rand(0, 60);
            $direction = rand(0, 1);
            if ($direction === 0) {
                return now()->subDays($days);
            } else {
                return now()->addDays($days);
            }
        }

        // If the tutoring session is completed
        // -> Random start time from now two months ago
        if ($status === 'completed') {
            return now()->subDays(rand(1, 60))->setTime(rand(8, 18), 0);
        }

        // Fallback if no status matches
        return now()->setTime(12, 0);
    }
}
