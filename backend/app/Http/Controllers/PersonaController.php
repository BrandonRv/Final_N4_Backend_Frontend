<?php

namespace App\Http\Controllers;

use App\Models\Bitacora;
use App\Models\Persona;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PersonaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show(Persona $persona)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Persona $persona)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'id' => 'integer',
                'primer_nombre' => 'required|string|max:10',
                'segundo_nombre' => 'string|max:10',
                'primer_apellido' => 'required|string|max:10',
                'segundo_apellido' => 'string|max:10',
                'usuario_modificacion' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            } else if ($request['primer_nombre'] && $request['primer_apellido'] && $request['usuario_modificacion']) {
                $persona = Persona::find($id);
                $persona->primer_nombre = $request['primer_nombre'];
                $persona->segundo_nombre = $request['segundo_nombre'];
                $persona->primer_apellido = $request['primer_apellido'];
                $persona->segundo_apellido = $request['segundo_apellido'];
                $persona->fecha_modificacion = now();
                $persona->usuario_modificacion = $request['usuario_modificacion'];
                $persona->save();

                $iduser = $id;
                $bitacora = 'El Usuario : ' . $request['usuario_modificacion'] . ' Actualizo sus Datos';
                $usuarioname =  $request['usuario_modificacion'];
                Bitacora::crearBitacora($iduser, $bitacora, $usuarioname);

                return response()->json([
                    'message' => 'Los Datos se han Actualizado correctamente',
                    'usuario_actualizado' => $persona->primer_nombre . " " . $persona->primer_apellido,
                ], 201);
            } else {
                return response()->json([
                    'message' => "'Los' Campos primer nombre y primer apellido son Obligatorios."
                ], 400);
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Persona $persona)
    {
        //
    }
}
