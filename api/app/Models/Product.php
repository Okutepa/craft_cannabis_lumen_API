<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 
        'type', 
        'description', 
        'price', 
        'thc_percentage', 
        'weight'
    ];

    public function media()
    {
        return $this->hasMany(Media::class);
    }

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}