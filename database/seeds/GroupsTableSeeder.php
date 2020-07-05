<?php

use Illuminate\Database\Seeder;
use App\Models\Group;

class GroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Clear out existing records.
        Group::truncate();

        $faker = \Faker\Factory::create();

        // Let's add some groups to our db.
        for ($i = 0; $i < 10; $i++) {
            Group::create([
                'group_name' => $faker->catchPhrase,
            ]);
        }

    }
}
