<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = [
        'id',
        'name',
        'barcode',
        'brand_id',
        'image',
        'description',
        'price',
        'cost',
        'isActive',
        'shop_id',
        'category_id',
        'unit_id',
        'cases',
        'units',
        'quantity',
    ];

    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }
    public function unit(): BelongsTo
    {
        return $this->belongsTo(UnitMeasure::class);
    }
}
