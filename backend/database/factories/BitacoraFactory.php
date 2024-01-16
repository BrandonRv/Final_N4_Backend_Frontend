<?php

namespace Database\Factories;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bitacora>
 */
class BitacoraFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'bitacora' => fake()->colorName(),
            'id_usuario' => Usuario::all()->random(),
            'fecha' => fake()->date(),
            'hora' => fake()->time(),
            'ip' => fake()->ipv4(),
            'so' =>  fake()->randomElement([
                'Windows',
                'Mac OS',
                'Linux',
            ]),
            'navegador' =>  fake()->unique()->randomElement([
                'Firefox',
                'Mullvad',
                'Brave',
                'Opera',
                'Bing',
                'Chrome',
            ]),
            'usuario' => fake()->randomElement([
                'Roblox67',
                'Fornite08',
                'Yutu95',
            ]),
        ];
    }
}
