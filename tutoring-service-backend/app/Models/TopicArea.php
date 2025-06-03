<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TopicArea extends Model
{
    protected $fillable = [
        'tutoring_subject_id',
        'tutor_id',
        'title',
        'slug',
        'description',
    ];

    // one topic area belongs to one tutoring subject
    public function tutoringSubject(): BelongsTo
    {
        return $this->belongsTo(TutoringSubject::class, 'tutoring_subject_id');
    }

    // one topic area belongs to one user (as tutor)
    public function tutor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }

    // one topic area can have many tutoring sessions
    public function tutoringSessions(): HasMany
    {
        return $this->hasMany(TutoringSession::class, 'topic_area_id');
    }
}
