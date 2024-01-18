<?php

namespace App\Http\Controllers;

use App\Models\Bitacora;
use Illuminate\Http\Request;

class BitacoraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Bitacora::all();
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
    public function show(Bitacora $bitacora)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bitacora $bitacora)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bitacora $bitacora)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        $bitacora_delete = Bitacora::find($id);
        if (Bitacora::where('id', $id)->exists() === false) {
            return response()->json([
                'message' => 'No existe una bitacora con el id N° ' . $id,
            ], 404);
        } else {
            $bitacora_delete->delete();
            $iduser = $request['id_user'];
            $bitacora = 'Se Elimino la Bitacora: ' . $bitacora_delete->bitacora . '.';
            $usuarioname =  $request['usuario_modificacion'];
            Bitacora::crearBitacora($iduser, $bitacora, $usuarioname);

            return response()->json([
                'message' => 'La Bitacora: ' . $bitacora_delete->bitacora . ' ha sido eliminada Correctamente.'
            ], 200);
        }
    }
}
