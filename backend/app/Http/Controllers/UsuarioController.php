<?php

namespace App\Http\Controllers;

use App\Models\Bitacora;
use App\Models\Persona;
use App\Models\Rol;
use App\Models\Usuario;
use Illuminate\Support\Facades\Validator;
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
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'usuario' => 'required|string',
            'habilitado' => 'integer',
            'usuario_modificacion' => 'required|string',
        ]);

        if (Usuario::where('id', $id)->exists() === false) {
            return response()->json([
                'message' => 'No existe un Usuario: ' . $request['usuario'] . ' o fue eliminado.',
            ], 404);
        } else if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        } else if ($request['usuario'] && $request['usuario_modificacion']) {

            if ($request['habilitado'] == 1 || $request['habilitado'] == 0) {
                $usuario = Usuario::find($id);
                $usuario->usuario = $request['usuario'];
                $usuario->habilitado = $request['habilitado'];
                $usuario->fecha_modificacion = now();
                $usuario->usuario_modificacion = $request['usuario_modificacion'];
                $usuario->save();

                $iduser = $id;
                $bitacora = "Se Actualizo el 'ESTADO' del Usuario: " . $request['usuario'];
                $usuarioname =  $request['usuario_modificacion'];
                Bitacora::crearBitacora($iduser, $bitacora, $usuarioname);

                return response()->json([
                    'message' => 'El Usuario ' . $request['usuario'] . ' se ha Actualizado correctamente',
                    'user_actualizado' => $request['usuario'],
                ], 201);
            } else {
                return response()->json([
                    'message' => "'Estado' solo acepta los valores 0 ó 1. Inserte los valores correcto."
                ], 400);
            }
        } else {
            return response()->json([
                'message' => "Es nesesario los Valores: del Switch de estado."
            ], 400);
        }
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
