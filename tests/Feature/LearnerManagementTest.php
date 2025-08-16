<?php

namespace Tests\Feature;

use App\Models\Learner;
use App\Models\User;
use App\Models\XapiStatement;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LearnerManagementTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    
    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_dashboard_displays_correctly()
    {
        $learner = Learner::factory()->create();
        XapiStatement::factory(5)->create(['learner_id' => $learner->id]);

        $response = $this->actingAs($this->user)
            ->get(route('dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('dashboard')
                ->has('metrics')
                ->has('topVerbs')
                ->has('recentStatements')
                ->has('dailyActivity')
        );
    }

    public function test_learners_index_displays_learners()
    {
        $learners = Learner::factory(3)->create();

        $response = $this->actingAs($this->user)
            ->get(route('learners.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('learners/index')
                ->has('learners.data', 3)
        );
    }

    public function test_can_create_learner()
    {
        $learnerData = [
            'learner_id' => 'LRN-TEST-001',
            'name' => 'Test Learner',
            'email' => 'test@example.com',
            'phone' => '+1234567890',
            'notes' => 'Test notes',
            'status' => 'active'
        ];

        $response = $this->actingAs($this->user)
            ->post(route('learners.store'), $learnerData);

        $response->assertRedirect();
        $this->assertDatabaseHas('learners', [
            'learner_id' => 'LRN-TEST-001',
            'name' => 'Test Learner',
            'email' => 'test@example.com'
        ]);
    }

    public function test_can_update_learner()
    {
        $learner = Learner::factory()->create();

        $updateData = [
            'learner_id' => $learner->learner_id,
            'name' => 'Updated Name',
            'email' => $learner->email,
            'phone' => '+9876543210',
            'notes' => 'Updated notes',
            'status' => 'inactive'
        ];

        $response = $this->actingAs($this->user)
            ->put(route('learners.update', $learner->learner_id), $updateData);

        $response->assertRedirect();
        $this->assertDatabaseHas('learners', [
            'id' => $learner->id,
            'name' => 'Updated Name',
            'phone' => '+9876543210',
            'status' => 'inactive'
        ]);
    }

    public function test_can_delete_learner()
    {
        $learner = Learner::factory()->create();

        $response = $this->actingAs($this->user)
            ->delete(route('learners.destroy', $learner->learner_id));

        $response->assertRedirect();
        $this->assertDatabaseMissing('learners', ['id' => $learner->id]);
    }

    public function test_learner_show_displays_with_statements()
    {
        $learner = Learner::factory()->create();
        XapiStatement::factory(3)->create(['learner_id' => $learner->id]);

        $response = $this->actingAs($this->user)
            ->get(route('learners.show', $learner->learner_id));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('learners/show')
                ->has('learner')
                ->has('verbStats')
                ->has('recentStatements')
        );
    }

    public function test_learner_validation_requires_required_fields()
    {
        $response = $this->actingAs($this->user)
            ->post(route('learners.store'), []);

        $response->assertSessionHasErrors(['learner_id', 'name', 'email', 'status']);
    }

    public function test_learner_email_must_be_unique()
    {
        $existingLearner = Learner::factory()->create();

        $response = $this->actingAs($this->user)
            ->post(route('learners.store'), [
                'learner_id' => 'LRN-NEW',
                'name' => 'New Learner',
                'email' => $existingLearner->email,
                'status' => 'active'
            ]);

        $response->assertSessionHasErrors(['email']);
    }

    public function test_learner_id_must_be_unique()
    {
        $existingLearner = Learner::factory()->create();

        $response = $this->actingAs($this->user)
            ->post(route('learners.store'), [
                'learner_id' => $existingLearner->learner_id,
                'name' => 'New Learner',
                'email' => 'new@example.com',
                'status' => 'active'
            ]);

        $response->assertSessionHasErrors(['learner_id']);
    }
}