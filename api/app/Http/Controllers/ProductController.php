<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        // Get all products with their media
        $products = Product::with('media')->get();
        return response()->json($products);
    }

    public function show($id)
    {
        // Get a specific product with its media
        $product = Product::with('media')->find($id);
        
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        
        return response()->json($product);
    }

    public function store(Request $request)
    {
        // Validate the request data
        $this->validate($request, [
            'name' => 'required',
            'type' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'thc_percentage' => 'required|numeric',
            'weight' => 'required|numeric'
        ]);
        
        // Create a new product
        $product = Product::create($request->all());
        
        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        // Find the product
        $product = Product::find($id);
        
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        
        // Validate the request data
        $this->validate($request, [
            'name' => 'required',
            'type' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'thc_percentage' => 'required|numeric',
            'weight' => 'required|numeric'
        ]);
        
        // Update the product
        $product->update($request->all());
        
        return response()->json($product, 200);
    }

    public function destroy($id)
    {
        // Find the product
        $product = Product::find($id);
        
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        
        // Delete the product
        $product->delete();
        
        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}