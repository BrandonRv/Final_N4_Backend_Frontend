<?php

namespace Database\Factories;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pagina>
 */
class PaginaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $index = 0;
        $usuario = [
            'Roblox67',
            'Fornite08',
            'Yutu95',
        ];
        
        return [
            'nombre' => "Repositorios BrandonRv",
            'url' =>  fake()->unique()->randomElement([
                'https://github.com/BrandonRv',
                'https://github.com/BrandonRv/MiniProyecto-N3',
                'https://github.com/BrandonRv/Proyecto-Final-N2A',
                'https://github.com/BrandonRv/ProgramaLavadora',
                'https://github.com/BrandonRv/AlarmarQuecteln95',
                'https://github.com/BrandonRv/Chrome-Dino-Runner',
                'https://github.com/BrandonRv/Practica-Calificada-5-N4',
                'https://github.com/BrandonRv/Scrum_N4_Grupal_Mi_Aporte',
                'https://github.com/BrandonRv/PF-N4-University',
                'https://github.com/BrandonRv/Practica-6-tailwind',
                'https://github.com/BrandonRv/practica-9',
                'https://github.com/BrandonRv/Mini_P_N4_RestFULL',
            ]),
            'estado' => 1,
            'descripcion'  => "Algunos Repositorios de Proyectos de Brandon Rievera",
            'icono'  => "â",
            'tipo' => "Tareas",
            'fecha_creacion' => now(),
            'usuario_creacion' =>  fake()->randomElement([
                'Roblox67',
                'Fornite08',
                'Yutu95',
            ]),
        ];
    }
}
