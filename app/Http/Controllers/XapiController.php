<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreXapiStatementRequest;
use App\Models\Learner;
use App\Models\XapiStatement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class XapiController extends Controller
{
    /**
     * Store a newly created xAPI statement.
     */
    public function store(StoreXapiStatementRequest $request): JsonResponse
    {
        $data = $request->validated();
        
        // Extract actor email from mbox (remove 'mailto:' prefix)
        $email = str_replace('mailto:', '', $data['actor']['mbox']);
        
        // Find or create learner
        $learner = Learner::where('email', $email)->first();
        
        if (!$learner) {
            $learner = Learner::create([
                'learner_id' => Str::uuid(),
                'email' => $email,
                'name' => $data['actor']['name'] ?? 'Unknown Learner',
                'status' => 'active'
            ]);
        }
        
        // Extract verb information
        $verbId = $data['verb']['id'];
        $verb = $this->extractVerbFromId($verbId);
        
        // Extract object information
        $objectName = null;
        if (isset($data['object']['definition']['name'])) {
            $names = $data['object']['definition']['name'];
            $objectName = $names['en-US'] ?? $names['en'] ?? array_values($names)[0] ?? null;
        }
        
        // Create xAPI statement
        XapiStatement::create([
            'statement_id' => $data['id'],
            'learner_id' => $learner->id,
            'verb' => $verb,
            'object_type' => $data['object']['objectType'] ?? 'Activity',
            'object_id' => $data['object']['id'],
            'object_name' => $objectName,
            'raw_statement' => $data,
            'statement_timestamp' => $data['timestamp'] ?? now(),
        ]);
        
        return response()->json(['status' => 'success'], 200);
    }
    
    /**
     * Get xAPI statements for analytics.
     */
    public function index(Request $request)
    {
        $query = XapiStatement::with('learner')
            ->latest('statement_timestamp');
            
        if ($request->has('learner_id')) {
            $query->where('learner_id', $request->learner_id);
        }
        
        if ($request->has('verb')) {
            $query->where('verb', $request->verb);
        }
        
        if ($request->has('from_date')) {
            $query->whereDate('statement_timestamp', '>=', $request->from_date);
        }
        
        if ($request->has('to_date')) {
            $query->whereDate('statement_timestamp', '<=', $request->to_date);
        }
        
        $statements = $query->paginate(50);
        
        return response()->json($statements);
    }
    
    /**
     * Extract verb from xAPI verb ID URL.
     */
    protected function extractVerbFromId(string $verbId): string
    {
        // Common xAPI verb patterns
        $commonVerbs = [
            'completed' => 'completed',
            'experienced' => 'experienced',
            'attempted' => 'attempted',
            'passed' => 'passed',
            'failed' => 'failed',
            'answered' => 'answered',
            'interacted' => 'interacted',
            'imported' => 'imported',
            'created' => 'created',
            'shared' => 'shared',
        ];
        
        $verbId = strtolower($verbId);
        
        foreach ($commonVerbs as $pattern => $verb) {
            if (str_contains($verbId, $pattern)) {
                return $verb;
            }
        }
        
        // Extract from URL path
        $parts = explode('/', $verbId);
        $lastPart = end($parts);
        
        return $lastPart ?: 'unknown';
    }
}