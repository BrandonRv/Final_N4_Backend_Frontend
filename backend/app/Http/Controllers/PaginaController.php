<?php

namespace App\Http\Controllers;

use App\Models\Bitacora;
use App\Models\Enlace;
use App\Models\Pagina;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaginaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Pagina::all();
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
    public function store(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'url' => 'required|string',
                'estado' => 'integer',
                'nombre' => 'required|string',
                'descripcion' => 'required|string',
                'tipo' => 'required|string',
                'usuario_creacion' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            } else if ($request['url'] && $request['nombre'] && $request['descripcion'] && $request['tipo'] && $request['usuario_creacion']) {

                if ($request['estado'] == 1 || $request['estado'] == 0) {

                    $paginas = new Pagina();
                    $paginas->url = $request['url'];
                    $paginas->nombre = $request['nombre'];
                    $paginas->estado = $request['estado'];
                    $paginas->descripcion = $request['descripcion'];
                    $paginas->tipo = $request['tipo'];
                    $paginas->fecha_creacion = now();
                    $paginas->usuario_creacion = $request['usuario_creacion'];
                    $paginas->save();

                    $iduser = $id;
                    $bitacora = 'Se Agrego una URL nueva: ' .  $request['nombre'] . '.';
                    $usuarioname =  $request['usuario_creacion'];
                    Bitacora::crearBitacora($iduser, $bitacora, $usuarioname);

                    return response()->json([
                        'message' => 'Pagina Agregada correctamente',
                        'urlname' => $request['nombre'],
                        'usuario' => $request['usuario_creacion']
                    ], 201);
                } else {
                    return response()->json([
                        'message' => "'Estado' solo acepta los valores 0 ó 1. Inserte los valores correcto."
                    ], 400);
                }
            } else {
                return response()->json([
                    'message' => "Es nesesario llenar los Campos: url, nombre, descripcion, tipo."
                ], 400);
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Pagina $pagina)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pagina $pagina)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pagina $pagina)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id) //id_user, usuario_creacion
    {
        try {
            $url_delete = Pagina::find($id);
            if (Pagina::where('id', $id)->exists() === false) {
                return response()->json([
                    'message' => 'No existe una URL con el id N° ' . $id,
                ], 404);
            } else {
                Enlace::where('id_pagina', $id)->update(['id_pagina' => null]);
                $url_delete->delete();
                
                $iduser = $request['id_user'];
                $bitacora = 'Se Elimino la URL: ' . $url_delete->nombre . '.';
                $usuarioname =  $request['usuario_creacion'];
                Bitacora::crearBitacora($iduser, $bitacora, $usuarioname);

                return response()->json([
                    'message' => 'La url: ' . $url_delete->nombre . ' ha sido eliminado Correctamente.'
                ], 200);
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ]);
        }
    }
}
