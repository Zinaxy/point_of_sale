<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use App\Models\Inventory;
use App\Models\UnitMeasure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProductResource;
use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductListResource;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       // $shop_id = Auth::user()->shop_id;
        return Inertia::render('product/Index',[
            'products' => ProductListResource::collection(Product::latest()->paginate()),
            'shops' => Shop::all(),
            'brands' => Brand::all(),
            'units' => UnitMeasure::all(),
            'categories' => Category::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('product/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        //dd($data);
        if ($request->hasFile('image')) {
             $file = $request->file('image');
             $extension = $file->getClientOriginalExtension();
             $imageName = time(). '_cover'.'.' . $extension;
             $file->move('files/products/', $imageName);
             $data['image'] = $imageName;
        }
        if($data['shop_id'] == null)
        {
            $data['shop_id'] = Auth::user()->shop_id;
        }
        if($data['units'] ==  null)
        {
            $data['units'] = 1;
        }
       $data['quantity'] = $data['cases'] * $data['units'] ;
       // dd($data);
       $product = Product::create($data);

        return to_route('product.index')->with('success','Product Created Successfully');

    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('product/Edit',[
            'product' => new ProductResource(Product::with('inventories')->where('id',$product->id)->first())
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('product/Edit',[
            'product' => new ProductResource(Product::with('inventory')->where('id',$product->id)->first())
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(StoreProductRequest $request, Product $product)
    {
        $data = $request->validated();
        dd($data);
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($product->image && file_exists(public_path('files/products/' . $product->image))) {
                unlink(public_path('files/products/' . $product->image));
            }

            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $imageName = time() . '_cover.' . $extension;
            $file->move('files/products/', $imageName);
            $data['image'] = $imageName;
        }

        // Update product directly without reassigning it
        $product->update([
            'name' => $data['name'],
            'image' => $data['image'] ?? $product->image, // Keep old image if not updated
            'price' => $data['price'],
            'description' => $data['description'],
        ]);

        // Ensure units is at least 1
        $data['units'] = max($data['units'], 1);

        // Fetch inventory record
        $inventory = Inventory::where('product_id', $product->id)->first();

        if ($inventory) {
            $inventory->update([
                'cases' => $data['cases'],
                'units' => $data['units'],
                'quantity' => $data['cases'] * $data['units'],
            ]);
        } else {
            // Handle case where inventory does not exist
            Inventory::create([
                'product_id' => $product->id,
                'cases' => $data['cases'],
                'units' => $data['units'],
                'quantity' => $data['cases'] * $data['units'],
            ]);
        }

        return to_route('product.index')->with('success', 'Product Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return to_route('product.index')->with('success','Product Deleted Successfully');
    }
}
