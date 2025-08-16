<?php

namespace Database\Factories;

use App\Models\Learner;
use App\Models\XapiStatement;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\XapiStatement>
 */
class XapiStatementFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\XapiStatement>
     */
    protected $model = XapiStatement::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $verbs = ['completed', 'experienced', 'attempted', 'passed', 'failed', 'answered', 'interacted'];
        $verb = $this->faker->randomElement($verbs);
        $objectName = $this->faker->sentence(3);
        
        return [
            'statement_id' => Str::uuid(),
            'learner_id' => Learner::factory(),
            'verb' => $verb,
            'object_type' => 'Activity',
            'object_id' => 'http://example.com/courses/' . Str::slug($objectName),
            'object_name' => $objectName,
            'raw_statement' => [
                'id' => Str::uuid(),
                'actor' => [
                    'mbox' => 'mailto:' . $this->faker->email(),
                    'name' => $this->faker->name(),
                ],
                'verb' => [
                    'id' => 'http://adlnet.gov/expapi/verbs/' . $verb,
                    'display' => ['en-US' => $verb],
                ],
                'object' => [
                    'id' => 'http://example.com/courses/' . Str::slug($objectName),
                    'definition' => [
                        'name' => ['en-US' => $objectName],
                    ],
                ],
            ],
            'statement_timestamp' => $this->faker->dateTimeBetween('-30 days', 'now'),
        ];
    }
}