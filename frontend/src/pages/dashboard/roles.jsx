import React from "react";
import {
    Button,
    IconButton,
    Menu,
    MenuList,
    MenuItem,
    MenuHandler,
    Switch,
} from "@material-tailwind/react";
import { Table } from "flowbite-react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useManagementContext } from "../../context/ManagementProvider";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export function Roles() {

    const { roles, usuario } = useManagementContext();
    const [updateModal, setUpdateModal] = useState(false);
    const [newModal, setNewModal] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [habilitado, setHabilitado] = useState(1);
    const [usuario_modificacion, setUsuario_modificacion] = useState(usuario?.usuario)
    const [usuario_creacion, setUsuario_creacion] = useState(usuario?.usuario)
    const id_user = usuario?.id;
    const [respuesta, setRespuesta] = useState("");
    const [id_rol, setId_rol] = useState(null)
    const [rol, setRol] = useState("");
    const rol_view = parseInt(sessionStorage.getItem("rol"));
    const tokenn = Cookies.get("token");

    // funcion para nuevo Rol con fetch
    const nuevoRol = async () => {

        const res = await fetch("http://127.0.0.1:8000/api/roles",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${tokenn}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id_user, rol, habilitado, usuario_creacion, usuario_modificacion }),
            })
        const data = await res.json();
        setRespuesta(data);
        setTimeout(() => {
            setRespuesta('');
        }, 2000);
    }

    // funcion para eliminar Rol con fetch
    const eliminarRol = async () => {

        const res = await fetch(`http://127.0.0.1:8000/api/roles/${id_rol}`, 
        { 
            method: "DELETE", 
            headers: { 
                Authorization: `Bearer ${Cookies.get("token")}`,
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({ id_user, usuario_modificacion }), 
        })
        const data = await res.json();
        setRespuesta(data);
        setTimeout(() => {
            setRespuesta('');
        }, 2000);
    }

    // funcion para editar Rol con fetch
    const updateRol = async () => {

        const res = await fetch(`http://127.0.0.1:8000/api/roles/${id_rol}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id_user, rol, habilitado, usuario_modificacion }),
            })
        const data = await res.json();
        setRespuesta(data);
        setTimeout(() => {
            setRespuesta('');
        }, 2000);
    }
    //console.log(id_rol);

    return (
        <>
            <div className="h-16 w-11/12 flex justify-between items-center">
                <p className="truncate  text-xl md:text-2xl font-medium pr-4"></p><p className="text-center text-green-600 text-sm">{respuesta?.message && <p>{respuesta?.message}</p>}</p>
                <form>
                    {rol_view == 1 ? (
                        <Button
                            className="mt-6 mr-4"
                            onClick={() => {
                                setUsuario_creacion(usuario?.usuario);
                                setUsuario_modificacion(usuario?.usuario);
                                setNewModal(true);
                            }}
                        >
                            Nuevo Rol
                        </Button>
                    ) : null}
                    {modalDelete ? (
                        <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-full max-w-lg max-h-full bg-white rounded-lg shadow dark:bg-gray-700 pb-6 pt-4 lg:pb-6 lg:pt-4 ">
                                    <button type="button" onClick={() => setModalDelete(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                    </button>
                                    <h3 id="titutlo" className="pb-2 mb-4 border-b-2 text-xl font-medium text-gray-900 dark:text-white px-6 lg:px-8">Confirme su Eliminación</h3>
                                    <form className="space-y-6 relative px-6 lg:px-8">
                                        <label className="block text-lg font-medium text-gray-900 dark:text-white">
                                            ¿Está seguro de que desea Eliminar el Rol: {rol}<span className="font-extrabold"> </span>?
                                        </label>
                                        <div id="btn_modal" className="flex justify-end gap-2 mt-4">
                                            <button
                                                type="button"
                                                className="w-fit text-white bg-gray-600 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                                onClick={() => setModalDelete(false)}
                                            >NO</button>
                                            <button
                                                type="button"
                                                className="w-fit text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                                onClick={() => {
                                                    eliminarRol();
                                                    setModalDelete(false);
                                                }}
                                            >SI</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                    {newModal ? (
                        <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-auto my-6 mx-auto max-w-sm">
                                    <div className="border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-800 outline-none focus:outline-none">
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200  text-gray-400 bg-transparent dark:hover:bg-gray-600 dark:hover:text-white">
                                            <h3 className="text-3xl font-semibold">
                                                Crear Nuevo Rol
                                            </h3>
                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 mt-1 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setNewModal(false)}
                                            >
                                                <svg className="w-4 h-4 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="relative p-6 flex flex-col gap-6">
                                            <div className="flex items-center">
                                                <span className="mr-4 text-sm font-medium text-gray-900 dark:text-gray-300">Nuevo rol :</span>
                                                <input
                                                    className="border-0 md:border dark:text-gray-300 dark:bg-gray-800 rounded-2xl"
                                                    type="text"
                                                    defaultValue={rol}
                                                    onChange={(e) => setRol(e.target.value)}
                                                    required />
                                            </div>
                                            <div className="flex gap-4 ">
                                                <span className="mr-4 text-sm font-medium text-gray-900 dark:text-gray-300">Estado del rol :</span>
                                                <Switch
                                                    label={habilitado === 0 ? "Rol Inactivo" : "Rol Activo"}
                                                    defaultChecked={habilitado === 1 ? true : false}
                                                    onChange={(e) => setHabilitado(e.target.checked ? 1 : 0)}
                                                    labelProps={{
                                                        className: `text-sm font-normal ${habilitado === 1 ? 'text-green-500' : 'text-red-500'}`,
                                                    }}
                                                    className="text-sm font-normal text-green-500"

                                                />
                                                {/* <label className="relative inline-flex items-center mb-4 cursor-pointer"> */}
                                                {/* <input type="checkbox" value="1" name="habilitado" className="sr-only peer" /> */}
                                                {/* <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div> */}
                                                {/* </label> */}
                                            </div>
                                        </div>
                                        <p className="text-center mt-4 text-green-600 text-sm">{respuesta?.message && <p>{respuesta?.rolname + " " + respuesta?.message}</p>}</p>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setNewModal(false)}
                                            >
                                                Cancelar
                                            </button>
                                            <Button
                                                className="bg-emerald-500 dark:bg-gray-500 text-gray-900 dark:text-gray-200 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"
                                                onClick={() => {
                                                    nuevoRol();
                                                    setNewModal(false)
                                                }}
                                            >
                                                Crear
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                    {updateModal ? (
                        <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-auto my-6 mx-auto max-w-sm">
                                    <div className="border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-800 outline-none focus:outline-none">
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200  text-gray-400 bg-transparent dark:hover:bg-gray-600 dark:hover:text-white">
                                            <h3 className="text-3xl font-semibold">
                                                Modificacion de Rol
                                            </h3>
                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 mt-1 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setUpdateModal(false)}
                                            >
                                                <svg className="w-4 h-4 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="relative p-6 flex flex-col gap-6">
                                            <p className="text-gray-900 dark:text-gray-300">NOTA: Los roles son unicos no se pueden repetir</p>
                                            <div className="flex items-center">
                                                <span className="mr-4 text-sm font-medium text-gray-900 dark:text-gray-300">Nuevo rol :</span>
                                                <input
                                                    className="border-0 md:border dark:text-gray-300 dark:bg-gray-800 rounded-2xl"
                                                    type="text"
                                                    defaultValue={rol}
                                                    onChange={(e) => setRol(e.target.value)}
                                                    required />
                                            </div>
                                            <div className="flex gap-4 ">
                                                <span className="mr-4 text-sm font-medium text-gray-900 dark:text-gray-300">Estado del rol :</span>
                                                <Switch
                                                    label={habilitado === 0 ? "Rol Inactivo" : "Rol Activo"}
                                                    defaultChecked={habilitado === 1 ? true : false}
                                                    onChange={(e) => setHabilitado(e.target.checked ? 1 : 0)}
                                                    labelProps={{
                                                        className: `text-sm font-normal ${habilitado === 1 ? 'text-green-500' : 'text-red-500'}`,
                                                    }}
                                                    className="text-sm font-normal text-green-500"
                                                />
                                                {/* <label className="relative inline-flex items-center mb-4 cursor-pointer"> */}
                                                {/* <input type="checkbox" value="1" name="habilitado" className="sr-only peer" /> */}
                                                {/* <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div> */}
                                                {/* </label> */}
                                            </div>
                                        </div>
                                        <p className="text-center mt-4 text-green-600 text-sm">{respuesta?.message && <p>{respuesta?.rolname + " " + respuesta?.message}</p>}</p>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setUpdateModal(false)}
                                            >
                                                Cancelar
                                            </button>
                                            <Button
                                                className="bg-emerald-500 dark:bg-gray-500 text-gray-900 dark:text-gray-200 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"
                                                onClick={() => {
                                                    updateRol();
                                                    setUpdateModal(false)
                                                }}
                                            >
                                                Guardar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                </form>
            </div>
            <section className=" h-[90%] flex w-11/12 justify-start items-start">
                <div className=" w-full h-full p-4">
                    <div className="relative h-full  overflow-auto shadow-md sm:rounded-lg">
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>
                                    Nombre del Rol
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Habilitado
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Fecha de Creación
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Fecha de Modificación
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Usuario de Creación
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Usuario de Modificación
                                </Table.HeadCell>
                                {rol_view == 1 ? (
                                    <Table.HeadCell>
                                        Acciones
                                    </Table.HeadCell>
                                ) : null}
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {roles ? (roles.map((e, index) => (
                                    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {e.rol}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {(e.habilitado) == 1 ?
                                                <p className="bg-green-500 text-center text-white rounded-full">Activado</p> :
                                                <p className="bg-red-500 text-center text-white rounded-full px-2">Desactivado</p>
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {e.fecha_creacion}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {e.fecha_modificacion}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {e.usuario_creacion}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {e.usuario_modificacion}
                                        </Table.Cell>
                                        {rol_view && rol_view == 1 ? (
                                            <Table.Cell>
                                                <Menu placement="left-start">
                                                    <MenuHandler>
                                                        <IconButton size="sm" variant="text" color="blue-gray">
                                                            <EllipsisVerticalIcon
                                                                strokeWidth={3}
                                                                fill="currenColor"
                                                                className="h-6 w-6"
                                                            />
                                                        </IconButton>
                                                    </MenuHandler>
                                                    <MenuList className="dark:bg-gray-800">
                                                        <MenuItem
                                                            onClick={() => {
                                                                setId_rol(e.id);
                                                                setRol(e.rol);
                                                                setHabilitado(e.habilitado);
                                                                setUsuario_modificacion(usuario?.usuario);
                                                                setUpdateModal(true);
                                                            }}
                                                        >Editar Datos</MenuItem>
                                                        <MenuItem
                                                            onClick={() => {
                                                                setId_rol(e.id);
                                                                setRol(e.rol);
                                                                setModalDelete(true);
                                                            }}
                                                        >Eliminarlo</MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </Table.Cell>) : null}
                                    </Table.Row>
                                ))) :
                                    <Table.Row className="flex text-center items-center justify-center">
                                        <Table.Cell role="status">
                                            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </Table.Cell>
                                    </Table.Row>}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Roles;