<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;
use App\Http\Requests\StoreInventoryRequest;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInventoryRequest $request)
    {
        $data = $request->validated();

        if($data['units'] ==  null)
        {
            $data['units'] = 1;
        }



        $inventory = Inventory::create([
            'product_id' => $data['product_id'],
            'shop_id' => $data['shop_id'],
            'cases' => $data['cases'],
            'units' => $data['units'],
            'quantity' => $data['cases'] * $data['units'] ,
        ]);

        return to_route('product.index')->with('success','Inventory Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Inventory $inventory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inventory $inventory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inventory $inventory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inventory $inventory)
    {
        //
    }
}
