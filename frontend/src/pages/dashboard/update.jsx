import { React, useState } from 'react';
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { useManagementContext } from "../../context/ManagementProvider";
export function Update() {

    const { informacion, usuario } = useManagementContext();
    const navigate = useNavigate();

    const [primer_nombre, setPrimer_nombre] = useState(informacion?.primer_nombre);
    const [segundo_nombre, setSegundo_nombre] = useState(informacion?.segundo_nombre);
    const [primer_apellido, setPrimer_apellido] = useState(informacion?.primer_apellido);
    const [segundo_apellido, setSegundo_apellido] = useState(informacion?.segundo_apellido);
    const [respuesta, setRespuesta] = useState("");
    const tokenn = Cookies.get("token");
    const id_user = informacion?.id
    const usuario_modificacion = usuario?.usuario; 

    // funcion para editar Datos Usuario con fetch
    const updateUser = async () => {

        const res = await fetch(`http://127.0.0.1:8000/api/update/${id_user}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${tokenn}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, usuario_modificacion }),
            })
        const data = await res.json();

        if (res.status == 429) {
            setRespuesta("Seccion Caducada");
            setTimeout(() => {
                setRespuesta('');
                navigate("/auth/login");
            }, 2000);
        }
        setRespuesta(data);
        setTimeout(() => {
            setRespuesta('');
        }, 2000);
    }

    const redireccion = (e) => {
        e.preventDefault();
        navigate("/dashboard/perfil")
    }

    return (
        <form className="mt-10 flex flex-col justify-start items-center w-full h-full">
            <p className="text-center text-green-600 mt-6 fixed text-sm">{respuesta?.message && <p>{respuesta?.message}</p>}</p>
            <div className="w-full md:w-[90%] flex flex-col h-[95%] items-cente border-blue-gray-200 border-0 md:border rounded-2xl">
                {/* bg-white */}
                <div className="h-[20%] p-6 bg-white opacity-70 dark:opacity-100 dark:bg-gray-700 border-b border-b-blue-gray-200 w-full flex justify-between items-center text-sm  px-8">
                    <div>
                        <p className="text-lg dark:text-gray-300">Change Info</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Changes will be reflected to every services</p>
                    </div>
                    <Link
                        onClick={redireccion}
                        className="text-sky-500 pl-8 dark:text-gray-400 mb-2 mt-4">&#60;&#160;Back</Link>
                </div>
                <div className=" w-full h-[80%] bg-white opacity-70 dark:opacity-100 dark:bg-gray-800">
                    <div className="h-24 w-full flex flex-col justify-center items-start text-sm  px-8">
                        <div className="flex">
                            <p className='dark:text-gray-400'>PRIMER NOMBRE</p>
                        </div>
                        <input
                            className="h-12 dark:bg-gray-800 w-full  text-black border dark:text-gray-400 rounded-lg pl-4"
                            type="text"
                            placeholder={informacion ? informacion.primer_nombre : "...."}
                            size="30"
                            defaultValue={primer_nombre}
                            onChange={(e) => setPrimer_nombre(e.target.value)}
                            required />
                    </div>
                    <div className="h-24 w-full flex flex-col justify-center items-start text-sm  px-8">
                        <div className="flex">
                            <p className='dark:text-gray-400'>SEGUNDO NOMBRE</p>
                        </div>
                        <input
                            className="h-12  w-full dark:bg-gray-800 text-black border dark:text-gray-400 rounded-lg pl-4"
                            type="text"
                            placeholder={informacion ? informacion.segundo_nombre : "...."}
                            size="30"
                            defaultValue={segundo_nombre}
                            onChange={(e) => setSegundo_nombre(e.target.value)}
                        />
                    </div>
                    <div className="h-24 w-full flex flex-col justify-center items-start text-sm  px-8">
                        <div className="flex">
                            <p className='dark:text-gray-400'>PRIMER APELLIDO</p>
                        </div>
                        <input
                            className="h-12  w-full dark:bg-gray-800 text-black border dark:text-gray-400 rounded-lg pl-4"
                            type="text"
                            placeholder={informacion ? informacion.primer_apellido : "...."}
                            size="30"
                            defaultValue={primer_apellido}
                            onChange={(e) => setPrimer_apellido(e.target.value)}
                            required />
                    </div>
                    <div className="h-24 w-full flex flex-col justify-center items-start text-sm  px-8">
                        <div className="flex">
                            <p className='dark:text-gray-400'>SEGUNDO APELLIDO</p>
                        </div>
                        <input
                            className="h-12  w-full dark:bg-gray-800 text-black border dark:text-gray-400 rounded-lg pl-4"
                            type="text"
                            placeholder={informacion ? informacion.segundo_apellido : "...."}
                            size="30"
                            defaultValue={segundo_apellido}
                            onChange={(e) => setSegundo_apellido(e.target.value)}
                        />
                    </div>

                    <div className=" h-16 w-full flex  justify-start items-center text-sm  px-8">
                        <Button onClick={updateUser} >Guardar</Button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Update;