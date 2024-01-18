<?php

namespace Database\Factories;

use App\Models\Persona;
use App\Models\Rol;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Usuario>
 */
class UsuarioFactory extends Factory
{
    protected static ?string $password;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        //$persona = Persona::all()->unique()->random();
        return [

            'id_persona' => Persona::get("id")->unique()->random(),
            'usuario' => $this->faker->unique()->randomElement([
                'Roblox67',
                'Fornite08',
                'Yutu95',
            ]),
            'email' => fake()->unique()->randomElement([
                'admin@mail.com',
                'maestro@mail.com',
                'alumno@mail.com',
            ]),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('1234'),
            'remember_token' => Str::random(10),
            'fecha'  => fake()->date(),
            'id_rol' => 1,
            'habilitado' => 1,
            'fecha_creacion' => now(),
            'usuario_creacion' => fake()->randomElement([
                'Roblox67',
                'Fornite08',
                'Yutu95',
            ]),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
