<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class SubscriberController extends Controller
{
    /**
     * Store a new subscriber.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function subscribe(Request $request)
    {
        try {
            $this->validate($request, [
                'email' => 'required|email|max:255|unique:subscribers,email'
            ]);
            
            $subscriber = Subscriber::create([
                'email' => $request->email
            ]);
            
            return response()->json([
                'message' => 'Subscription successful',
                'subscriber' => $subscriber
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error creating subscriber', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'error' => 'An error occurred while processing your subscription',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all subscribers.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $subscribers = Subscriber::all();
            
            return response()->json($subscribers);
        } catch (\Exception $e) {
            Log::error('Error fetching subscribers', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'error' => 'An error occurred while fetching subscribers',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}