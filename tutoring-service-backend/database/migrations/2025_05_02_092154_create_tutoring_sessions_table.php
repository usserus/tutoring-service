<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tutoring_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('topic_area_id')->constrained('topic_areas')->onDelete('cascade');
            $table->foreignId('tutor_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('student_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('location_id')->constrained('addresses')->onDelete('cascade');
            $table->dateTime('start_time');
            $table->integer('duration')->default(60);
            $table->decimal('price', 6, 2)->nullable();
            $table->enum('status', [
                'requested',    // student requests a session
                'available',    // session is available for booking
                'booked',       // session is booked by a student
                'completed',    // session is completed
            ])->default('available');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tutoring_sessions');
    }
};
