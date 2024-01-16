<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $personaSeeder = new PersonaSeeder();
        $personaSeeder->run();
        $paginaSeeder = new PaginaSeeder();
        $paginaSeeder->run();
        $rolSeeder = new RolSeeder();
        $rolSeeder->run();
        $enlaceSeeder = new EnlaceSeeder();
        $enlaceSeeder->run();
        $usuarioSeeder = new UsuarioSeeder();
        $usuarioSeeder->run();
        $bitacoraSeeder = new BitacoraSeeder();
        $bitacoraSeeder->run();
    }
}
