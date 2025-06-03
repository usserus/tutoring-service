<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(AddressesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(TutoringSubjectsTableSeeder::class);
        $this->call(TopicAreasSeeder::class);
        $this->call(TutoringSessionsTableSeeder::class);
    }
}
