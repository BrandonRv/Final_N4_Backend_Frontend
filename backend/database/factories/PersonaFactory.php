<?php

namespace Database\Factories;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Persona>
 */
class PersonaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'primer_nombre' => fake()->lastName(),
            'segundo_nombre' =>  fake()->unique()->randomElement(['Rosney', 'Maria', 'Severo']),
            'primer_apellido' => fake()->lastName(),
            'segundo_apellido' =>  fake()->unique()->randomElement(['Marin', 'Blanquicett', 'Villamizar']),
            // 'segundo_apellido' => fake()->updatedAt(),
            'fecha_creacion' => now(),
            'usuario_creacion' =>  fake()->unique()->randomElement([
                'Roblox67',
                'Fornite08',
                'Yutu95',
            ]),
        ];
    }
}
