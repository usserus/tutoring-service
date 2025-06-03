<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = new User;
        $address = Address::inRandomOrder()->first(); // Get a random address
        $user->address()->associate($address);
        $user->first_name = 'Charlie';
        $user->last_name = 'Brown';
        $user->email = 'charlie.brown@user.com';
        $user->password = 'secret';
        $user->is_tutor = false;
        $user->education = 'Kommunikation, Wissen Medien';
        $user->save();

        $user1 = new User;
        $address1 = Address::inRandomOrder()->first();
        $user1->address()->associate($address1);
        $user1->first_name = 'Snoopy';
        $user1->last_name = 'Dog';
        $user1->email = 'snoopy.dog@user.com';
        $user1->password = 'secret';
        $user1->is_tutor = true;
        $user1->education = 'Webentwicklung, Software Engineering';
        $user1->save();

        $user2 = new User;
        $address2 = Address::inRandomOrder()->first();
        $user2->address()->associate($address2);
        $user2->first_name = 'Linus';
        $user2->last_name = 'Van Pelt';
        $user2->email = 'linus.vanpelt@user.com';
        $user2->password = 'secret';
        $user2->is_tutor = false;
        $user2->education = 'Literatur, Philosophie';
        $user2->save();

        $user3 = new User;
        $address3 = Address::inRandomOrder()->first();
        $user3->address()->associate($address3);
        $user3->first_name = 'Lucy';
        $user3->last_name = 'Van Pelt';
        $user3->email = 'lucy.vanpelt@user.com';
        $user3->password = 'secret';
        $user3->is_tutor = false;
        $user3->education = 'Psychologie, Soziale Arbeit';
        $user3->save();

        $user4 = new User;
        $address4 = Address::inRandomOrder()->first();
        $user4->address()->associate($address4);
        $user4->first_name = 'Schroeder';
        $user4->last_name = 'Piano';
        $user4->email = 'schroeder.piano@user.com';
        $user4->password = 'secret';
        $user4->is_tutor = true;
        $user4->education = 'Musik, Klavier';
        $user4->save();
    }
}
