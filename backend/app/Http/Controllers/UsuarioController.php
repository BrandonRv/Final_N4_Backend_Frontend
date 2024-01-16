<?php

namespace App\Http\Controllers;

use App\Models\Bitacora;
use App\Models\Persona;
use App\Models\Rol;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $resultado = DB::select('
        SELECT usuarios.id,
        usuarios.id_persona,
        usuarios.id_rol,
        usuarios.habilitado,
        usuarios.usuario,
        usuarios.email,
        usuarios.fecha,
        usuarios.fecha_creacion,
        usuarios.fecha_modificacion,
        usuarios.usuario_creacion,
        usuarios.usuario_modificacion,
        rols.rol
        FROM usuarios
        LEFT JOIN rols
        ON usuarios.id_rol = rols.id;
    ');

        return $resultado;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        if (Usuario::where('id', $id)->exists() === false) {
            return response()->json([
                'message' => 'No existe un Usuario con el id N° ' . $id,
            ], 404);
        }

        $usuario = Usuario::find($id);
        $informacion = Persona::find($usuario->id_persona);//$usuario->id_persona

        return response()->json([
            'usuario' => $usuario,
            'informacion' => $informacion,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Usuario $usuario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Usuario $usuario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $usuario_delete = Usuario::find($id);
        if (Usuario::where('id', $id)->exists() === false) {
            return response()->json([
                'message' => 'No existe un Rol con el id N° ' . $id,
            ], 404);
        } else {
            Bitacora::where('id_usuario', $id)->update(['id_usuario' => null]);
            $usuario_delete->delete();
            return response()->json([
                'message' => 'El Usuario: ' . $usuario_delete->usuario . ' ha sido eliminado Correctamente.'
            ], 200);
        }
    }
}
