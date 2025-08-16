<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLearnerRequest;
use App\Http\Requests\UpdateLearnerRequest;
use App\Models\Learner;
use Inertia\Inertia;

class LearnerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $learners = Learner::with('xapiStatements')
            ->withCount('xapiStatements')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('learners/index', [
            'learners' => $learners
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('learners/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLearnerRequest $request)
    {
        $learner = Learner::create($request->validated());

        return redirect()->route('learners.show', $learner)
            ->with('success', 'Learner created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Learner $learner)
    {
        $learner->load(['xapiStatements' => function ($query) {
            $query->latest('statement_timestamp')->take(10);
        }]);
        
        $verbStats = $learner->xapiStatements()
            ->selectRaw('verb, COUNT(*) as count')
            ->groupBy('verb')
            ->orderByDesc('count')
            ->get();

        return Inertia::render('learners/show', [
            'learner' => $learner,
            'verbStats' => $verbStats,
            'recentStatements' => $learner->xapiStatements
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Learner $learner)
    {
        return Inertia::render('learners/edit', [
            'learner' => $learner
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLearnerRequest $request, Learner $learner)
    {
        $learner->update($request->validated());

        return redirect()->route('learners.show', $learner)
            ->with('success', 'Learner updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Learner $learner)
    {
        $learner->delete();

        return redirect()->route('learners.index')
            ->with('success', 'Learner deleted successfully.');
    }
}