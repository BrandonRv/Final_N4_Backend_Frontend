<?php

namespace Database\Factories;

use App\Models\Pagina;
use App\Models\Rol;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Enlace>
 */
class EnlaceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_pagina' => Pagina::all(['id'])->random(),
            'id_rol' => Rol::all(['id'])->random(),
            'descripcion'  => "Algunos Repositorios de Proyectos de Brandon Rievera",
            'fecha_creacion' => now(),
            'usuario_creacion' =>  fake()->randomElement([
                'Roblox67',
                'Fornite08',
                'Yutu95',
            ]),
        ];
    }
}
