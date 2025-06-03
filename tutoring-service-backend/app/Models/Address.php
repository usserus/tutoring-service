<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Address extends Model
{
    protected $fillable = [
        'street',
        'house_number',
        'postal_code',
        'city',
        'country',
    ];

    // one address can belong to many users
    public function users() : HasMany
    {
        return $this->hasMany(User::class);
    }

    // one address can belong to many tutoring sessions
    public function tutoringSessions() : HasMany
    {
        return $this->hasMany(TutoringSession::class);
    }
}
