<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UnitMeasure>
 */
class UnitMeasureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'type' => $this->faker->randomElement(['Meters', 'Grams', 'Kilograms','litres']),
            'symbol' => $this->faker->randomElement(['m', 'g', 'kg']),
        ];
    }
}
