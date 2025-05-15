<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('barcode', 100)->unique()->nullable();
            $table->foreignId('shop_id')->nullable()->constrained('shops')->nullOnDelete();
            $table->foreignId('brand_id')->nullable()->constrained('brands')->nullOnDelete();
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->foreignId('unit_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->integer('cases')->unsigned()->nullable();
            $table->integer('units')->unsigned()->nullable();
            $table->integer('quantity')->unsigned()->nullable();
            $table->string('image')->nullable();
            $table->longText('description')->nullable();
            $table->decimal('cost', 10, 2)->nullable()->default(00.00);
            $table->decimal('price', 10, 2)->nullable()->default(00.00);
            $table->boolean('isActive')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
