<?php

use Illuminate\Database\Seeder;
use App\Models\Person;

class PeopleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Clear out existing records.
        Person::truncate();

        $faker = \Faker\Factory::create();

        // Let's add some groups to our db.
        for ($i = 0; $i < 50; $i++) {
            Person::create([
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'email_address' => $faker->email,
                'status' => (bool)random_int(0, 1) ? 'active' : 'archived'
            ]);
        }

    }
}
