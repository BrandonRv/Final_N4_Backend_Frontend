<?php

namespace Database\Factories;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rol>
 */
class RolFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'rol' => fake()->unique()->randomElement(['Administrador', 'Maestros', 'Alumnos']),
            'habilitado' => 1,
            'fecha_creacion' => now(),
            'usuario_creacion' => fake()->randomElement([
                'Roblox67',
                'Fornite08',
                'Yutu95',
            ]),
        ];
    }
}
