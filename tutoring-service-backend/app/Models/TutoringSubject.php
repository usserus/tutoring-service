<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TutoringSubject extends Model
{
    protected $fillable = [
        'tutor_id',
        'title',
        'slug',
        'description',
    ];

    // one tutoring subject belongs to one user (as tutor)
    public function tutor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }

    // one tutoring subject can have many topic areas
    public function topicAreas(): HasMany
    {
        return $this->hasMany(TopicArea::class, 'tutoring_subject_id');
    }
}
