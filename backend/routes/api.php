<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CustomerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('api')->group(function () {
    // Customer CRUD operations
    Route::apiResource('customers', CustomerController::class);
    
    // Additional customer endpoints
    Route::get('customers-options', [CustomerController::class, 'getOptions']);
    Route::patch('customers/{customer}/status', [CustomerController::class, 'updateStatus']);
    
    // CORS preflight options
    Route::options('{any}', function () {
        return response('', 200);
    })->where('any', '.*');
});

// Enable CORS for all API routes
Route::middleware(['api', 'cors'])->group(function () {
    // All customer routes with CORS
    Route::apiResource('customers', CustomerController::class);
    Route::get('customers-options', [CustomerController::class, 'getOptions']);
    Route::patch('customers/{customer}/status', [CustomerController::class, 'updateStatus']);
});