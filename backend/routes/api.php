<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BitacoraController;
use App\Http\Controllers\PaginaController;
use App\Http\Controllers\PersonaController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:api')->group(function () {

///////////////////////////////////////////////////////////////////////////////////////
//-------------------------- REGISTRAR NUEVO USUARIO --------------------------------//
///////////////////////////////////////////////////////////////////////////////////////

Route::post('/register', [AuthController::class, 'register']);

///////////////////////////////////////////////////////////////////////////////////////
//------------------------------- DATOS USUARIO -------------------------------------//
///////////////////////////////////////////////////////////////////////////////////////

Route::put('/update/{id}', [PersonaController::class, 'update']);

///////////////////////////////////////////////////////////////////////////////////////
//--------------------------------- Rutas Roles -------------------------------------//
///////////////////////////////////////////////////////////////////////////////////////

Route::get('/roles', [RolController::class, 'index']);
Route::get('/roles/{id}', [RolController::class, 'show']);
Route::post('/roles', [RolController::class, 'store']);
Route::put('/roles/{id}', [RolController::class, 'update']);
Route::delete('/roles/{id}', [RolController::class, 'destroy']);

///////////////////////////////////////////////////////////////////////////////////////
//-------------------------------- Rutas Usuarios -----------------------------------//
///////////////////////////////////////////////////////////////////////////////////////

Route::get('/usuario', [UsuarioController::class, 'index']);
Route::get('/usuario/{id}', [UsuarioController::class, 'show']);
Route::put('/usuario/{id}', [UsuarioController::class, 'update']);
Route::delete('/usuario/{id}', [UsuarioController::class, 'destroy']);

///////////////////////////////////////////////////////////////////////////////////////
//-------------------------------- Rutas Bitacoras -----------------------------------//
///////////////////////////////////////////////////////////////////////////////////////

Route::get('/bitacoras', [BitacoraController::class, 'index']);
Route::delete('/bitacoras/{id}', [BitacoraController::class, 'destroy']);

///////////////////////////////////////////////////////////////////////////////////////
//-------------------------------- Rutas Paginas ------------------------------------//
///////////////////////////////////////////////////////////////////////////////////////

Route::get('/paginas', [PaginaController::class, 'index']);
Route::post('/paginas/{id}', [PaginaController::class, 'store']);
Route::delete('/paginas/{id}', [PaginaController::class, 'destroy']);

});

