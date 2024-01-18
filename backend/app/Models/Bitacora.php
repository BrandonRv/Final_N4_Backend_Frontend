<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bitacora extends Model
{
    use HasFactory;

    protected $fillable = [
        'bitacora',
        'usuario',
        'fecha',
        'hora',
    ];

    public static function crearBitacora($iduser, $bitacora, $usuarioname)
    {
        Bitacora::create([
            'id_usuario' => $iduser,
            'bitacora' => $bitacora,
            'usuario' => $usuarioname,
            'fecha' => now()->toDateString(),
            'hora' => now()->toTimeString(),
        ]);
    }
}
