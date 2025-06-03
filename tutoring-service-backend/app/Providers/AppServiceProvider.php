<?php

namespace App\Providers;

use App\Models\TopicArea;
use App\Models\TutoringSession;
use App\Models\TutoringSubject;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('own-tutoring-subject', function (User $user, TutoringSubject $tutoringSubject) {
            return $user->id === $tutoringSubject->tutor_id;
        });

        Gate::define('own-topic-area', function (User $user, TopicArea $topicArea) {
            return $user->id === $topicArea->tutor_id;
        });

        Gate::define('own-tutoring-session', function (User $user, TutoringSession $tutoringSession) {
            return $user->id === $tutoringSession->tutor_id;
        });
    }
}
