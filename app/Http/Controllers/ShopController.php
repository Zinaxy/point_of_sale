<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreShopRequest;
use App\Http\Resources\ShopListResource;

class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('shop/Index',[
            'shops' => ShopListResource::collection(Shop::latest()->paginate())
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('shop/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreShopRequest $request)
    {
        $data = $request->validated();

        Shop::Create($data);

        return to_route('shop.index')->with('success','Shop Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Shop $shop)
    {
            return Inertia::render('shop/Show',[
            'shop' => $shop
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shop $shop)
    {
         return Inertia::render('shop/Edit',[
            'shop' => $shop
            ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreShopRequest $request, Shop $shop)
    {
        $data = $request->validated();

        $shop->update($data);

        return to_route('shop.index')->with('success','Shop Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shop $shop)
    {
        $shop->delete();
        return to_route('shop.index')->with('success','Shop Deleted Successfully');
    }
}
