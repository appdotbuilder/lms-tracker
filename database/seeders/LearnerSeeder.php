<?php

namespace Database\Seeders;

use App\Models\Learner;
use App\Models\XapiStatement;
use Illuminate\Database\Seeder;

class LearnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 50 learners with xAPI statements
        Learner::factory(50)
            ->active()
            ->create()
            ->each(function ($learner) {
                // Create 5-15 xAPI statements per learner
                XapiStatement::factory(random_int(5, 15))
                    ->create(['learner_id' => $learner->id]);
            });

        // Create 10 inactive learners with fewer statements
        Learner::factory(10)
            ->inactive()
            ->create()
            ->each(function ($learner) {
                // Create 1-3 xAPI statements per inactive learner
                XapiStatement::factory(random_int(1, 3))
                    ->create(['learner_id' => $learner->id]);
            });
    }
}