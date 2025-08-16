<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Learner;
use App\Models\XapiStatement;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with key metrics.
     */
    public function index()
    {
        // Get key metrics
        $totalLearners = Learner::count();
        $activeLearners = Learner::where('status', 'active')->count();
        $totalStatements = XapiStatement::count();
        
        // Recent xAPI activity (last 7 days)
        $recentActivity = XapiStatement::where('statement_timestamp', '>=', now()->subDays(7))
            ->count();
            
        // Most common verbs
        $topVerbs = XapiStatement::select('verb', DB::raw('COUNT(*) as count'))
            ->groupBy('verb')
            ->orderByDesc('count')
            ->take(5)
            ->get();
            
        // Recent statements
        $recentStatements = XapiStatement::with('learner')
            ->latest('statement_timestamp')
            ->take(10)
            ->get();
            
        // Daily activity for the last 30 days
        $dailyActivity = XapiStatement::select(
                DB::raw('DATE(statement_timestamp) as date'),
                DB::raw('COUNT(*) as count')
            )
            ->where('statement_timestamp', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return Inertia::render('dashboard', [
            'metrics' => [
                'totalLearners' => $totalLearners,
                'activeLearners' => $activeLearners,
                'totalStatements' => $totalStatements,
                'recentActivity' => $recentActivity,
            ],
            'topVerbs' => $topVerbs,
            'recentStatements' => $recentStatements,
            'dailyActivity' => $dailyActivity,
        ]);
    }
}