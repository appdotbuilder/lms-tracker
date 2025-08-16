<?php

namespace Tests\Feature;

use App\Models\Learner;
use App\Models\XapiStatement;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class XapiIngestionTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_ingest_xapi_statement()
    {
        $xapiStatement = [
            'id' => '12345678-1234-5678-1234-123456789012',
            'actor' => [
                'mbox' => 'mailto:test@example.com',
                'name' => 'Test Learner'
            ],
            'verb' => [
                'id' => 'http://adlnet.gov/expapi/verbs/completed',
                'display' => [
                    'en-US' => 'completed'
                ]
            ],
            'object' => [
                'id' => 'http://example.com/course/introduction',
                'definition' => [
                    'name' => [
                        'en-US' => 'Introduction Course'
                    ]
                ]
            ],
            'timestamp' => '2024-01-01T12:00:00Z'
        ];

        $response = $this->postJson(route('xapi.statements.store'), $xapiStatement);

        $response->assertStatus(200)
                ->assertJson(['status' => 'success']);

        $this->assertDatabaseHas('learners', [
            'email' => 'test@example.com',
            'name' => 'Test Learner'
        ]);

        $this->assertDatabaseHas('xapi_statements', [
            'statement_id' => '12345678-1234-5678-1234-123456789012',
            'verb' => 'completed',
            'object_name' => 'Introduction Course'
        ]);
    }

    public function test_creates_learner_if_not_exists()
    {
        $xapiStatement = [
            'id' => '12345678-1234-5678-1234-123456789012',
            'actor' => [
                'mbox' => 'mailto:newlearner@example.com',
                'name' => 'New Learner'
            ],
            'verb' => [
                'id' => 'http://adlnet.gov/expapi/verbs/experienced',
            ],
            'object' => [
                'id' => 'http://example.com/activity/test',
            ]
        ];

        $response = $this->postJson(route('xapi.statements.store'), $xapiStatement);

        $response->assertStatus(200);

        $learner = Learner::where('email', 'newlearner@example.com')->first();
        $this->assertNotNull($learner);
        $this->assertEquals('New Learner', $learner->name);
        $this->assertEquals('active', $learner->status);
    }

    public function test_uses_existing_learner_if_exists()
    {
        $existingLearner = Learner::factory()->create([
            'email' => 'existing@example.com',
            'name' => 'Existing Learner'
        ]);

        $xapiStatement = [
            'id' => '12345678-1234-5678-1234-123456789012',
            'actor' => [
                'mbox' => 'mailto:existing@example.com',
                'name' => 'Different Name' // This should be ignored
            ],
            'verb' => [
                'id' => 'http://adlnet.gov/expapi/verbs/attempted',
            ],
            'object' => [
                'id' => 'http://example.com/activity/test',
            ]
        ];

        $response = $this->postJson(route('xapi.statements.store'), $xapiStatement);

        $response->assertStatus(200);

        // Should still have only one learner with original name
        $this->assertEquals(1, Learner::where('email', 'existing@example.com')->count());
        
        $learner = Learner::where('email', 'existing@example.com')->first();
        $this->assertEquals('Existing Learner', $learner->name); // Original name preserved
    }

    public function test_extracts_verb_correctly()
    {
        $testCases = [
            'http://adlnet.gov/expapi/verbs/completed' => 'completed',
            'http://adlnet.gov/expapi/verbs/experienced' => 'experienced',
            'http://example.com/verbs/attempted' => 'attempted',
            'http://custom.com/custom-verb' => 'custom-verb',
        ];

        foreach ($testCases as $verbId => $expectedVerb) {
            $xapiStatement = [
                'id' => '12345678-1234-5678-1234-12345678901' . random_int(0, 9),
                'actor' => [
                    'mbox' => 'mailto:test' . random_int(1000, 9999) . '@example.com',
                    'name' => 'Test Learner'
                ],
                'verb' => [
                    'id' => $verbId,
                ],
                'object' => [
                    'id' => 'http://example.com/activity/test',
                ]
            ];

            $response = $this->postJson(route('xapi.statements.store'), $xapiStatement);
            $response->assertStatus(200);

            $this->assertDatabaseHas('xapi_statements', [
                'verb' => $expectedVerb
            ]);
        }
    }

    public function test_xapi_validation_requires_required_fields()
    {
        $response = $this->postJson(route('xapi.statements.store'), []);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['id', 'actor.mbox', 'verb.id', 'object.id']);
    }

    public function test_xapi_statement_id_must_be_uuid()
    {
        $xapiStatement = [
            'id' => 'not-a-uuid',
            'actor' => [
                'mbox' => 'mailto:test@example.com',
            ],
            'verb' => [
                'id' => 'http://adlnet.gov/expapi/verbs/completed',
            ],
            'object' => [
                'id' => 'http://example.com/activity/test',
            ]
        ];

        $response = $this->postJson(route('xapi.statements.store'), $xapiStatement);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['id']);
    }

    public function test_can_query_xapi_statements()
    {
        $learner = Learner::factory()->create();
        XapiStatement::factory(5)->create(['learner_id' => $learner->id, 'verb' => 'completed']);
        XapiStatement::factory(3)->create(['learner_id' => $learner->id, 'verb' => 'attempted']);

        // Test basic query
        $response = $this->getJson(route('xapi.statements.index'));
        $response->assertStatus(200)
                ->assertJsonStructure([
                    'data' => [
                        '*' => ['id', 'statement_id', 'verb', 'learner']
                    ]
                ]);

        // Test filtering by learner
        $response = $this->getJson(route('xapi.statements.index', ['learner_id' => $learner->id]));
        $response->assertStatus(200);
        $statements = $response->json('data');
        $this->assertCount(8, $statements);

        // Test filtering by verb
        $response = $this->getJson(route('xapi.statements.index', ['verb' => 'completed']));
        $response->assertStatus(200);
        $completedStatements = $response->json('data');
        $this->assertCount(5, array_filter($completedStatements, fn($s) => $s['verb'] === 'completed'));
    }
}