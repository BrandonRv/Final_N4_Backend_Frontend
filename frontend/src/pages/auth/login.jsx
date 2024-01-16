import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useManagementContext } from "../../context/ManagementProvider";
//import logo from "../../assets/devchallenges.svg";
import logo from "../../assets/devchallenges-light.svg";
import facebook from "../../assets/Facebook.svg";
import github from "../../assets/Github.svg";
import google from "../../assets/Google.svg";
import twitter from "../../assets/Twitter.svg";
import { useRef } from "react";
import useDarkMode from "../../service/useDarkMode";

export function Login() {

  const { setEmail, setPassword, error, handleSubmit, email, password } = useManagementContext();
  const iconRef = useRef(null);
  const DarkMode = useDarkMode(iconRef);
  const temabg = localStorage.getItem("theme"); 

  return (
    <section
      className="h-screen grid place-items-center w-full bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 dark:from-gray-900 dark:via-gray-600 dark:to-gray-400 dark:bg-gradient-to-r"
    >
      <div className="w-full abolute h-screen grid place-items-center bg-opacity-20 bg-blue-900 dark:bg-gray-900 dark:bg-opacity-50 transition-all duration-1000 ease-in-out">
        <form
          // method="POST"
          // action="http://127.0.0.1:8001/api/authentication"
          onSubmit={handleSubmit}
          className="bg-[#3d80a8] dark:bg-gray-900 flex flex-col justify-center md:justify-between h-full md:h-fit w-full md:w-96 p-10 md:p-10 border-0 md:border border-gray-400 md:rounded-3xl"
        >
          <div className="overflow-hidden p-2">
            <img className="scale-100" src={logo} alt="logo" />
            <div className="flex mt-6 text-center justify-between">
              <br />
              <h2 class="text-2xl dark:text-gray-400 font-semibold">Login</h2>
              <br />
            </div>
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" className="-mb-3 dark:text-gray-400  mt-0 font-medium text-center">
              Bienvenido ingresa con tu cuenta
            </Typography>
            <div className="relative block mb-3">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="w-5 h-5">
                    <path
                      d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path
                      d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </svg>
              </span>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 pl-8 text-gray-400 focus:!border-t-gray-900"
                type="email"
                id="correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                labelProps={{
                  className: "before:content-none text-gray-500 after:content-none",
                }}
              />
            </div>
            <div className="relative block mb-3">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="w-6 h-6">
                    <path fillRule="evenodd"
                      d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                      clipRule="evenodd" />
                  </svg>
                </svg>
              </span>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                id="contrasena"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" !border-t-blue-gray-200 pl-8 text-gray-400 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none text-gray-500 after:content-none",
                }}
              />
            </div>
          </div>
          <p className="text-center text-red-500 text-sm">{error && <p>{error}</p>} </p>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center dark:text-gray-400 justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black dark:text-gray-500 transition-colors hover:text-gray-800 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-2" color="brown" fullWidth>
            Ingresar
          </Button>
          <div className="flex items-center justify-between gap-2 mt-2">
            <Typography variant="small" className="font-medium text-gray-900">
              <a className="dark:text-gray-400" href="../dashboard">
                ¿Olvidó su contraseña?
              </a>
            </Typography>
          </div>
          <p className=" dark:text-gray-500 mt-3 flex text-xs justify-center">
            or
            continue with these
            social profile</p>
          <div className="p-4 pl-8 pr-8 flex justify-around align-items-center  ">
            <a className=" bg-yellow-700 rounded-full" href="#"><img src={google} alt="google.svg" /></a>
            <a className=" bg-blue-700 rounded-full" href="#"><img src={facebook} alt="Facebook.svg" /></a>
            <a className=" bg-black rounded-full" href="#"><img src={twitter} alt="Twitter.svg" /></a>
            <a className=" bg-indigo-700 rounded-full" href="#"><img src={github} alt="Gihub.svg" /></a>
          </div >
        </form>
        <div className="hidden -mt-24 w-3/12 lg:block">
          <div className="h-full w-full object-cover p-6 rounded-3xl text-center bg-[#77b273] dark:bg-[#778789]">
            <li className="flex justify-center">admin@mail.com <p>&#160; PASS: 1234</p></li>
          </div>
        </div>
      </div>
      <button
        id="dark-mode-toggle"
        className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-blue-300 dark:bg-gray-400 transition-colors duration-1000 ease-in-out shadow-lg flex items-center justify-center"
        onClick={DarkMode}
      >
        <i ref={iconRef} className="fa-solid fa-moon text-gray-900"></i>
      </button>
    </section>
  );
}

export default Login;