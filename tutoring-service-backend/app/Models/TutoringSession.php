<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TutoringSession extends Model
{
    protected $fillable = [
        'topic_area_id',
        'tutor_id',
        'student_id',
        'start_time',
        'duration',
        'location_id',
        'price',
        'status',
    ];

    // one tutoring session belongs to one topic area
    public function topicArea() : BelongsTo
    {
        return $this->belongsTo(TopicArea::class, 'topic_area_id');
    }

    // one tutoring session belongs to one user (as tutor)
    public function tutor() : BelongsTo
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }

    // one tutoring session belongs to one user (as student)
    public function student() : BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    // one tutoring session belongs to one location
    public function location() : BelongsTo
    {
        return $this->belongsTo(Address::class, 'location_id');
    }
}
