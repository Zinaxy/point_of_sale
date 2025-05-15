<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProductListResource;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $shop_id = Auth::user()->shop_id;
        $products = ProductListResource::collection(Product::where('shop_id', $shop_id)->where('quantity','>=', 1)->latest()->paginate());
        return Inertia::render('dashboard',[
            'products' => $products
        ]);
    }
}
