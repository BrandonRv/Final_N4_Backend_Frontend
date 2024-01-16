<?php

namespace App\Http\Controllers;

use App\Models\Enlace;
use App\Models\Rol;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Rol::all();
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
        $validator = Validator::make($request->all(), [
            'rol' => 'required|string|unique:rols',
            'habilitado' => 'integer',
            'usuario_creacion' => 'required|string',
            'usuario_modificacion' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        } else if ($request['rol'] && $request['usuario_creacion'] && $request['usuario_modificacion']) {

            if ($request['habilitado'] == 1 || $request['habilitado'] == 0) {

                $rol = new Rol();
                $rol->rol = $request['rol'];
                $rol->habilitado = $request['habilitado'];
                $rol->fecha_creacion = now();
                $rol->fecha_modificacion = now();
                $rol->usuario_creacion = $request['usuario_creacion'];
                $rol->usuario_modificacion = $request['usuario_modificacion'];
                $rol->save();
                return response()->json([
                    'message' => 'Rol registrado correctamente',
                    'rolname' => $rol->rol,
                ], 201);
            } else {
                return response()->json([
                    'message' => "'Estado' solo acepta los valores 0 ó 1. Inserte los valores correcto."
                ], 400);
            }
        } else {
            return response()->json([
                'message' => "Es nesesario llenar los Campos: rol y estado debe tener valores correcto."
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        if (Rol::where('id', $id)->exists() === false) {
            return response()->json([
                'message' => 'No existe un Rol con el id N° ' . $id,
            ], 404);
        }
        return Rol::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rol $rol)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'rol' => 'required|string',
            'habilitado' => 'integer',
            'usuario_modificacion' => 'required|string',
        ]);

        if (Rol::where('id', $id)->exists() === false) {
            return response()->json([
                'message' => 'No existe un Registro con el id N° ' . $id,
            ], 404);
        } else if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        } else if ($request['rol'] && $request['usuario_modificacion']) {

            if ($request['habilitado'] == 1 || $request['habilitado'] == 0) {
                $rol = Rol::find($id);
                $rol->rol = $request['rol'];
                $rol->habilitado = $request['habilitado'];
                $rol->fecha_modificacion = now();
                $rol->usuario_modificacion = $request['usuario_modificacion'];
                $rol->save();
                return response()->json([
                    'message' => 'El Rol se ha Actualizado correctamente',
                    'rol_actualizado' => $rol->rol,
                ], 201);
            } else {
                return response()->json([
                    'message' => "'Estado' solo acepta los valores 0 ó 1. Inserte los valores correcto."
                ], 400);
            }
        } else {
            return response()->json([
                'message' => "Es nesesario llenar los Campos: rol y estado debe tener valores correcto."
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $rol_delete = Rol::find($id);
        if (Rol::where('id', $id)->exists() === false) {
            return response()->json([
                'message' => 'No existe un Rol con el id N° ' . $id,
            ], 404);
        } else {
            Usuario::where('id_rol', $id)->update(['id_rol' => null]);
            Enlace::where('id_rol', $id)->update(['id_rol' => null]);
            $rol_delete->delete();
            return response()->json([
                'message' => 'El Rol N° ' . $id . ' ha sido eliminado Correctamente.'
            ], 200);
        }
    }
}
