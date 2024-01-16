import { useLocation, Link } from "react-router-dom";
import { useManagementContext } from "../../context/ManagementProvider";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  setSidenavType,
  setSidenavColor,
  useMaterialTailwindController,
  setOpenSidenav,
  setFixedNavbar,
} from "@/context";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav, sidenavColor, sidenavType } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const { usuario } = useManagementContext();
  const navigate = useNavigate();

  const sidenavColors = {
    white: "from-gray-100 to-gray-100 border-gray-200",
    dark: "from-black to-black border-gray-200",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
  };

  const cerrarSeccions = (e) => {
    e.preventDefault();
    Cookies.remove('token');
    navigate("/auth/login");
  }

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${fixedNavbar
        ? "sticky top-4 z-40 py-3 shadow-md dark:bg-gray-800 shadow-blue-gray-500/5"
        : "px-0 py-1"
        }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
              }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 dark:text-gray-600 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal dark:text-gray-500 "
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography className="dark:text-gray-400" variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input className="dark:text-gray-400 dark:peer-focus:bg-gray-200" label="Search" /> 
            {/* !border-t-blue-gray-200 focus:!border-t-gray-900 dark:disabled:peer-focus:bg-gray-50 dark:focus:border-gray-100 " */}
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          {usuario.usuario ?
            (<Link to="/dashboard/perfil">
              <Button
                variant="text"
                color="blue-gray"
                className="hidden items-center gap-1 px-4 xl:flex normal-case"
              >
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                {usuario.usuario}
              </Button>
              <IconButton
                variant="text"
                color="blue-gray"
                className="grid xl:hidden"
              >
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </Link>
            ) : (<div className="flex justify-center" role="status">
                   <svg aria-hidden="true" className="inline w-6 h-6 mr-2 mt-6 mb-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                   </svg>
                  <span className="sr-only">Loading...</span>
                </div>
            )}
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0 dark:bg-gray-800">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal dark:text-gray-500"
                  >
                    <strong>Nuevo mensaje</strong> para ti
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal dark:text-gray-500 opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5 dark:text-gray-500" /> hace 13 minutos
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal dark:text-gray-500"
                  >
                    <strong>Nuevo album</strong> de Marc Anthony
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal dark:text-gray-500 opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5 dark:text-gray-500" /> hace 1 dia
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal dark:text-gray-500"
                  >
                    Pago completado exitosamente
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal dark:text-gray-500 opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5 dark:text-gray-500" /> hace 2 dias
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="border-0 w-72 fixed dark:bg-gray-800">
              <div className="flex ml-4 items-center gap-3">
                <div className="mb-8">
                  <Typography className="dark:text-gray-300" variant="h6" color="blue-gray">
                    Color Boton Lateral
                  </Typography>
                  <div className="mt-3 flex items-center gap-2">
                    {Object.keys(sidenavColors).map((color) => (
                      <span
                        key={color}
                        className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${sidenavColors[color]
                          } ${sidenavColor === color ? "border-black" : "border-transparent"
                          }`}
                        onClick={() => {
                          setSidenavColor(dispatch, color);
                          localStorage.setItem("btnColor", color);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex ml-4 items-center gap-4">
                <div className="mb-2">
                  <Typography className="dark:text-gray-300" variant="h6" color="blue-gray">
                    Color de Fondo & Barra
                  </Typography>
                  <div className="mt-3 flex items-center gap-2">
                    <Button
                      className="p-0.59 dark:border-gray-100"
                      variant="gradient"
                      onClick={() => setSidenavType(dispatch, "dark")}
                    >
                      Oscuro
                    </Button>
                    <Button
                      className="p-2 dark:text-gray-800 dark:bg-gray-300"
                      variant="outlined"
                      onClick={() => setSidenavType(dispatch, "white")}
                    >
                      Blanco
                    </Button>
                  </div>
                </div>
              </div>
                <div className="w-64 flex items-center dark:focus:bg-gray-800 gap-4">
                  <hr />
                  <div className="flex items-center justify-between py-2">
                    <Typography className="dark:text-gray-300" variant="h6" color="blue-gray">
                      Barra Navegacion Fija
                    </Typography>
                    <div className="flex items-center">
                      <label className="relative border-none flex ml-5 items-center mb-4 cursor-pointer mt-4">
                        <input
                          id="navbar-fixed"
                          defaultChecked={fixedNavbar}
                          onChange={() => setFixedNavbar(dispatch, !fixedNavbar)}
                          type="checkbox"
                          className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 text-gray-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-gray-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  <hr />
                </div>
              <div className="text-center mb-4 dark:hover:border-gray-800 justify-center flex">
                <Button
                  variant="gradient"
                  className="flex items-center gap-2"
                  onClick={cerrarSeccions}
                >
                  Cerrar Sección
                </Button>
              </div>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
