<?php

// app/Http/Controllers/AuthController.php
namespace App\Http\Controllers;

use App\Models\Bitacora;
use App\Models\Persona;
use App\Models\Rol;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Usuario;
use Exception;
use Illuminate\Support\Facades\Crypt;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);
        $emailexist = Usuario::where('email', $credentials['email'])->exists();
        $rolexist = Usuario::where('email', $credentials['email'])->get();
        if (!$request->email || !$request->password) {
            $errors[] = 'Fallo la Autenticación';
            return response()->json([
                'mensaje' => implode(', ', $errors),
            ], 500);
        }
        if (!$token = auth()->attempt($credentials)) {
            if ($emailexist) {
                $errors[] = 'Contraseña incorrecta';
                return response()->json([
                    'mensaje' => implode(', ', $errors),
                ], 401);
            }
            if (!$emailexist) {
                $errors[] = 'Usuario no Registrado';
                return response()->json([
                    'mensaje' => implode(', ', $errors),
                ], 404);
            }
        }

        $iduser = $rolexist[0]->id;
        $bitacora = 'Se Logueo el usuario: ' . $rolexist[0]->usuario . '.';
        $usuarioname =  $rolexist[0]->usuario;
        Bitacora::crearBitacora($iduser, $bitacora, $usuarioname);

        return response()->json([
            'token' =>  $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'rol' => Rol::find($rolexist[0]->id_rol)->rol,
            'id_rol' => $rolexist[0]->id_rol,
            'usuario' => $rolexist[0]->usuario,
            'id' => $rolexist[0]->id,
            'estado' => $rolexist[0]->habilitado === 0 ? 'Cuenta desactivada contacte al administrador' : 'Autorizado',
            'redirected' => $rolexist[0]->habilitado === 0 ? '/auth/login' : '/dashboard/home',
            'habilitado' => $rolexist[0]->habilitado,
            'acceso' => $emailexist
        ], 200);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'usuario' => 'required|string|unique:usuarios',
                'email' => 'required|string|email|max:80|unique:usuarios',
                'id_rol' => 'integer',
                'primer_nombre' => 'required|string|max:10',
                'segundo_nombre' => 'string|max:10',
                'primer_apellido' => 'required|string|max:10',
                'segundo_apellido' => 'string|max:10',
                'usuario_creacion' => 'required|string',
                'usuario_modificacion' => 'required|string',
            ]);

            $usuarioexist = Usuario::where('usuario', $request['usuario'])->exists();
            $emailexist = Usuario::where('email', $request['email'])->exists();

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            } else if ($usuarioexist === true) {
                return response()->json([
                    'message' => 'El Usuario que ingresaste ya existe, prueba con otro diferente'
                ], 400);
            } else if ($emailexist === true) {
                return response()->json([
                    'message' => 'El Email que ingresaste ya existe, prueba con otro o inicia Seccion'
                ], 400);
            } else if ($request['usuario'] && $request['email'] && $request['primer_nombre'] && $request['primer_apellido'] && $request['usuario_creacion'] && $request['usuario_creacion'] && $request['usuario_modificacion']) {
                $persondata = new Persona();
                $persondata->primer_nombre = $request['primer_nombre'];
                $persondata->segundo_nombre = $request['segundo_nombre'];
                $persondata->primer_apellido = $request['primer_apellido'];
                $persondata->segundo_apellido = $request['segundo_apellido'];
                $persondata->fecha_creacion = now();
                $persondata->fecha_modificacion = now();
                $persondata->usuario_creacion = $request['usuario_creacion'];
                $persondata->usuario_modificacion = $request['usuario_modificacion'];
                $persondata->save();
                $usuariodata = new Usuario();
                $usuariodata->usuario = $request['usuario'];
                $usuariodata->email = $request['email'];
                $usuariodata->email_verified_at = now();
                $persondata->fecha = now();
                $usuariodata->id_rol = $request['id_rol'] == null ? 1 : $request['id_rol'];
                $usuariodata->id_persona = $persondata->id;
                $usuariodata->password =  bcrypt(1234);
                $usuariodata->fecha_creacion = now();
                $usuariodata->fecha_modificacion = now();
                $usuariodata->usuario_creacion = $request['usuario_creacion'];
                $usuariodata->usuario_modificacion = $request['usuario_modificacion'];
                $usuariodata->save();
                $persona = Persona::find($persondata->id);
                $usuario = Usuario::where('usuario', $request['usuario'])->get();

                $iduser = $usuariodata->id;
                $bitacora = 'Se Registro nuevo usuario: ' . $request['usuario'] . '.';
                $usuarioname =  $request['usuario_creacion'];
                Bitacora::crearBitacora($iduser, $bitacora, $usuarioname);

                return response()->json([
                    'message' => 'Usuario creado exitosamente! ' .  $iduser,
                    'datos_personal' => $persona,
                    'usuario' => $usuario
                ], 201);
            } else {
                return response()->json([
                    'message' =>
                    "No se Actualizó nada. Es nesesario llenar los Campos:
                'primer nombre, primer apellido, un usuario y email valido'
                 para poder registrarlo, en la Base de Datos"
                ], 400);
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ]);
        }
    }
}
