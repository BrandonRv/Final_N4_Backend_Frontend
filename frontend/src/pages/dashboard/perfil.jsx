import { React } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useManagementContext } from "../../context/ManagementProvider";

export function Perfil() {
    const { informacion } = useManagementContext();
    const navigate = useNavigate();

    const redirect = (e) => {
        e.preventDefault();
        navigate("/dashboard/update")
    }

    return (
        <form className="mt-8 flex flex-col justify-start items-center w-full h-full">
            <div className='w-full flex-col flex justify-start items-center md:w-[90%] h-[95%] border-blue-gray-200 border-0 md:border rounded-2xl'>
            <div className='flex flex-col justify-start bg-white opacity-70 dark:opacity-100 dark:bg-gray-700 w-full rounded-t-2xl p-4 items-center'>
            <p className="text-3xl dark:text-gray-400 mb-2 mt-4">Personal info</p>
            <p className="mb-6 dark:text-gray-400 ">Basic info, like your name and photo</p>
            </div>
            <div className="w-full h-full flex flex-col opacity-70 dark:opacity-100 items-center dark:bg-gray-800 border-0 md:border rounded-b-2xl bg-white">
                <div className="p-4 md:px-20 border-b border-b-blue-gray-200 h-[30%] w-full flex justify-between items-center">
                    <div>
                        <p className="text-lg dark:text-gray-300">Profile</p>
                        <p className="text-xs text-gray-400 w-44 md:w-full">Some info may be visible to other people</p>
                    </div>
                    <Link 
                    onClick={redirect} 
                    className="bg-white hover:bg-gray-300 text-gray-500 dark:text-gray-100 border border-gray-400 dark:bg-teal-700 py-2 px-8 rounded-lg" 
                    >Editar</Link>
                </div>
                <div className=" w-full h-[70%] border-none">
                    <div className="px-6 md:px-20 h-16 w-full border-b border-b-blue-gray-200 flex items-center md:justify-normal justify-between text-gray-400 text-sm">
                        <p className="w-2/6 h-full flex items-center">PRIMER NOMBRE</p>
                        {informacion ?
                            <p className="dark:text-gray-400  text-black md:text-left text-right">{informacion?.primer_nombre}</p>
                            : <div className="text-left ">
                                <p className="animate-pulse ">.&#160;&#160;.&#160;&#160;.&#160;&#160;.&#160;&#160;.</p>
                            </div>
                        }
                    </div>
                    <div className="px-6 md:px-20 h-16 w-full flex border-b border-b-blue-gray-200 items-center md:justify-normal justify-between text-gray-400 text-sm">
                        <p className="w-2/6 h-full flex items-center">SEGUNDO NOMBRE</p>
                        {informacion ?
                            <p className="dark:text-gray-400 text-black md:text-left text-right">{informacion?.segundo_nombre}</p>
                            : <div className="text-left ">
                                <p className="animate-pulse ">.&#160;&#160;.&#160;&#160;.&#160;&#160;.&#160;&#160;.</p>
                            </div>
                        }
                    </div>
                    <div className="px-6 md:px-20 h-16 w-full flex border-b border-b-blue-gray-200 items-center md:justify-normal justify-between text-gray-400 text-sm">
                        <p className="w-2/6 h-full flex items-center">PRIMER APELLIDO</p>
                        {informacion ?
                            <p className="dark:text-gray-400  text-black md:text-left text-right">{informacion?.primer_apellido}</p>
                            : <div className="text-left ">
                                <p className="animate-pulse ">.&#160;&#160;.&#160;&#160;.&#160;&#160;.&#160;&#160;.</p>
                            </div>
                        }
                    </div>
                    <div className="px-6 md:px-20 h-16 w-full flex border-b border-b-blue-gray-200md:border rounded-b-xl items-center md:justify-normal justify-between text-gray-400 text-sm">
                        <p className="w-2/6 h-full flex items-center">SEGUNDO APELLIDO</p>
                        {informacion ?
                            <p className="dark:text-gray-400 text-black md:text-left text-right">{informacion?.segundo_apellido}</p>
                            : <div className="text-left ">
                                <p className="animate-pulse ">.&#160;&#160;.&#160;&#160;.&#160;&#160;.&#160;&#160;.</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            </div>
        </form>
    );
}
export default Perfil;