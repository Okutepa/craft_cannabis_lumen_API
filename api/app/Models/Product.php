<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'name', 
        'type', 
        'description', 
        'price', 
        'thc_percentage', 
        'weight'
    ];

    protected $casts = [
        'price' => 'float',
        'thc_percentage' => 'float',
        'weight' => 'float'
    ];

    public function media()
    {
        return $this->hasMany(Media::class);
    }

    // Optional: Add accessor for formatted price
    public function getPriceAttribute($value)
    {
        return number_format($value, 2);
    }
}