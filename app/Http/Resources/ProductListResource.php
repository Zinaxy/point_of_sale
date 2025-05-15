<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\InventoryListResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
         return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description ?: null,
            'price' => $this->price ?: "00.00",
            'isActive' => $this->isActive,
            'image' => $this->image ?: null,
            'barcode' => $this->barcode ?: null,
            'brand' => $this->brand ?: null,
            'cost' => $this->cost,
            'shop' => $this->shop,
            'category' => $this->category ?: null,
            'unit'=> $this->unit ?: null,
            'cases'=> $this->cases ?: null,
            'units'=> $this->units ?: null,
            'quantity'=> $this->quantity ?: "0",
            /* 'inventories' => InventoryListResource::collection($this->whenLoaded('inventories')), */
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
