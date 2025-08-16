<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LearnerController;
use App\Http\Controllers\XapiController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Welcome page showcases the MIS system
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// xAPI ingestion endpoint (public for external systems)
Route::post('/xapi/statements', [XapiController::class, 'store'])->name('xapi.statements.store');
Route::get('/xapi/statements', [XapiController::class, 'index'])->name('xapi.statements.index');

Route::middleware(['auth', 'verified'])->group(function () {
    // Main dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Learner management
    Route::resource('learners', LearnerController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
