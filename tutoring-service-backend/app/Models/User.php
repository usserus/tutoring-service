<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'address_id',
        'first_name',
        'last_name',
        'email',
        'password',
        'is_tutor',
        'education',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return ['user' => [
            'id' => $this->id,
            'is_tutor' => $this->is_tutor,]];
    }

    // one user belongs to one address
    public function address(): BelongsTo
    {
        return $this->belongsTo(Address::class);
    }

    // one user as tutor can have many tutoring subjects
    public function tutoringSubjects(): HasMany
    {
        return $this->hasMany(TutoringSubject::class, 'tutor_id');
    }

    // one user as tutor can have many topic areas
    public function topicAreas(): HasMany
    {
        return $this->hasMany(TopicArea::class, 'tutor_id');
    }

    // one user as tutor can have many tutoring sessions
    public function tutoringSessionsAsTutor(): HasMany
    {
        return $this->hasMany(TutoringSession::class, 'tutor_id');
    }

    // one user as student can have many tutoring sessions
    public function tutoringSessionsAsStudent(): HasMany
    {
        return $this->hasMany(TutoringSession::class, 'student_id');
    }
}
