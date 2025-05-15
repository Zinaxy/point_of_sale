<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shop>
 */
class ShopFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['Shop A', 'Shop B', 'Shop C']),
            'address' => $this->faker->address,
            'phone' => $this->faker->numerify('+263 -(###)-###-###'),
            'email' => $this->faker->email,
        ];
    }
}
