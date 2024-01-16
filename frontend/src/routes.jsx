import {
    HomeIcon,
    TableCellsIcon,
    UserCircleIcon,
    ServerStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Roles, Perfil, Update, Usuarios, Bitacoras, Paginas } from "@/pages/dashboard"; //Bitacoras Paginas
import { Login } from "@/pages/auth";

const icon = {
    className: "w-5 h-5 text-inherit",
};

const rolSeccion = parseInt(sessionStorage.getItem("rol"));

export const routes = [
    {
        layout: "dashboard",
        pages: [
            {
                icon: <HomeIcon {...icon} />,
                rol: rolSeccion,
                name: "dashboard",
                path: "/home",
                element: <Home />,
            },
            {
                icon: <UserCircleIcon {...icon} />,
                rol: rolSeccion,
                name: "Perfil",
                path: "/perfil",
                element: <Perfil />,
            },
            {
                icon: <UserCircleIcon {...icon} />,
                rol: rolSeccion,
                name: "Update",
                path: "/update",
                element: <Update />,
            },
            {
                icon: <i class="fa-solid fa-user-gear fa-xl text-blue-gray-500 dark:text-blue-gray-50"></i>,
                rol: rolSeccion,
                name: "Roles",
                path: "/roles",
                element: <Roles />,
            },
            {
                icon: <i className="fa-solid fa-users fa-xl text-blue-gray-500 dark:text-blue-gray-50" ></i>,
                rol: rolSeccion,
                name: "Usuarios",
                path: "/usuarios",
                element: <Usuarios />,
            },
            {
                icon: <TableCellsIcon {...icon} />,
                rol: rolSeccion,
                name: "Bitacoras",
                path: "/bitacoras",
                element: <Bitacoras />,
            },
            {
                icon: <i class="fa-solid fa-link fa-xl"></i>,
                rol: rolSeccion,
                name: "Paginas",
                path: "/paginas",
                element: <Paginas />,
            },
        ],
    },
    {
        title: "Ir al Loging",
        layout: "auth",
        pages: [
            {
                icon: <ServerStackIcon {...icon} />,
                rol: rolSeccion,
                name: "login",
                path: "/login",
                element: <Login />,
            },
        ],
    },
];

export default routes;
