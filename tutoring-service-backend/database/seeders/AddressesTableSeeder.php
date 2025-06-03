<?php

namespace Database\Seeders;

use App\Models\Address;
use Illuminate\Database\Seeder;

class AddressesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $address1 = new Address();
        $address1->street = 'Leopoldstraße';
        $address1->house_number = '23';
        $address1->postal_code = '4040';
        $address1->city = 'Linz';
        $address1->country = 'Austria';
        $address1->save();

        $address2 = new Address();
        $address2->street = 'Hafenstraße';
        $address2->house_number = '22';
        $address2->postal_code = '6972';
        $address2->city = 'Fussach';
        $address2->country = 'Austria';
        $address2->save();

        $address3 = new Address();
        $address3->street = 'Vorgartenstraße';
        $address3->house_number = '1';
        $address3->postal_code = '1200';
        $address3->city = 'Wien';
        $address3->country = 'Austria';
        $address3->save();
    }
}
