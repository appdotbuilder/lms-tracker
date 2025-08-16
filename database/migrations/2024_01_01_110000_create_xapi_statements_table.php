<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('xapi_statements', function (Blueprint $table) {
            $table->id();
            $table->string('statement_id')->unique()->comment('xAPI statement UUID');
            $table->foreignId('learner_id')->constrained()->onDelete('cascade');
            $table->string('verb')->comment('xAPI verb (e.g., completed, experienced, attempted)');
            $table->string('object_type')->comment('Type of object (Activity, Agent, etc.)');
            $table->string('object_id')->comment('Object identifier');
            $table->string('object_name')->nullable()->comment('Human-readable object name');
            $table->json('raw_statement')->comment('Full xAPI statement JSON');
            $table->timestamp('statement_timestamp')->comment('When the statement occurred');
            $table->timestamps();
            
            // Indexes for performance and analytics
            $table->index('statement_id');
            $table->index('verb');
            $table->index('object_type');
            $table->index('statement_timestamp');
            $table->index(['verb', 'statement_timestamp']);
            $table->index(['learner_id', 'verb']);
            $table->index(['learner_id', 'statement_timestamp']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('xapi_statements');
    }
};