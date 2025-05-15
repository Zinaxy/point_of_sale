<?php

namespace Database\Seeders;

use App\Models\Shop;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Brand;
use App\Models\Category;
use App\Models\UnitMeasure;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
           // 'shop_id' => 1,
            'email' => 'test@example.com',
        ]);

        Shop::factory(3)->create();
        Category::factory(10)->create();
        Brand::factory(10)->create();
        UnitMeasure::factory(5)->create();
    }
}
