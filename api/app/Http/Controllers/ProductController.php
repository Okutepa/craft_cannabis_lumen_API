<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    public function index()
    {
        try {
            $products = Product::with('media')->get();
            
            return response()->json($products);
        } catch (\Exception $e) {
            Log::error('Error fetching products', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'error' => 'An error occurred while fetching products', 
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $product = Product::with('media')->find($id);
            
            if (!$product) {
                return response()->json(['message' => 'Product not found'], 404);
            }
            
            return response()->json($product);
        } catch (\Exception $e) {
            Log::error('Error fetching product', [
                'id' => $id,
                'message' => $e->getMessage()
            ]);
            
            return response()->json([
                'error' => 'An error occurred while fetching the product', 
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $this->validate($request, [
                'name' => 'required|string|max:255',
                'type' => 'required|string|max:100',
                'description' => 'required|string',
                'price' => 'required|numeric|min:0',
                'thc_percentage' => 'required|numeric|min:0|max:100',
                'weight' => 'required|numeric|min:0'
            ]);
            
            $product = Product::create($request->all());
            
            return response()->json($product, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error creating product', [
                'message' => $e->getMessage()
            ]);
            
            return response()->json([
                'error' => 'An error occurred while creating the product', 
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);
            
            $this->validate($request, [
                'name' => 'sometimes|required|string|max:255',
                'type' => 'sometimes|required|string|max:100',
                'description' => 'sometimes|required|string',
                'price' => 'sometimes|required|numeric|min:0',
                'thc_percentage' => 'sometimes|required|numeric|min:0|max:100',
                'weight' => 'sometimes|required|numeric|min:0'
            ]);
            
            $product->update($request->all());
            
            return response()->json($product, 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error updating product', [
                'id' => $id,
                'message' => $e->getMessage()
            ]);
            
            return response()->json([
                'error' => 'An error occurred while updating the product', 
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            
            $product->delete();
            
            return response()->json(['message' => 'Product deleted successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Error deleting product', [
                'id' => $id,
                'message' => $e->getMessage()
            ]);
            
            return response()->json([
                'error' => 'An error occurred while deleting the product', 
                'details' => $e->getMessage()
            ], 500);
        }
    }
}