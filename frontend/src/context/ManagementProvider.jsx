import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const ManagementContext = createContext();

export const useManagementContext = () => useContext(ManagementContext); //management

export const ManagementProvider = ({ children }) => {
    const [rol, setRol] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [seccion, setSeccion] = useState("");
    const [roles, setRoles] = useState("");
    const [users, setUsers] = useState("");
    const [bitacoras, setBitacoras] = useState("");
    const [paginas, setPaginas] = useState("");
    const [informacion, setInformacion] = useState([]);
    const [iduser, setIduser] = useState(Cookies.get("user"));
    const [usuario, setUsuario] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = await fetch("http://127.0.0.1:8002/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ email, password }),
            })
            const data = await auth.json();
            if (auth.ok) {
                if (data?.acceso === true) {
                    Cookies.set("token", data.token, { secure: true, expires: 0.0160 });
                    Cookies.set("user", data.id, { secure: true, expires: 0.0160 });
                    setUsuario(data);
                    sessionStorage.setItem("rol", data.id_rol);
                    setRol(data.rol);
                    setIduser(data.id);
                    setError(data.estado);
                    const redireccionDelay = async () => {
                        await new Promise(resolve => setTimeout(resolve, 500));
                        if (data.habilitado === 1) {
                            window.location.href = `${data.redirected}`;
                        } else if (data.habilitado === 0) {
                            setError("");
                            Cookies.remove('token');
                        }
                    };
                    redireccionDelay();
                }
            } else if (auth.status === 401) {
                setError(data.mensaje);
                const redireccionDelay = async () => {
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    setError("");
                };
                redireccionDelay();
            } else if (auth.status === 404) {
                setError(data.mensaje);
                const redireccionDelay = async () => {
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    setError("");
                };
                redireccionDelay();
            } else if (auth.status === 500) {
                setError(data.mensaje);
                const redireccionDelay = async () => {
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    setError("");
                };
                redireccionDelay();
            } else {
                throw new Error(auth.status);
            }
        } catch (error) {
            console.error('Error:', error);
            setError("Ocurrió un error al iniciar sesión");
            setSeccion("Ocurrió un error al iniciar sesión");
        }
    }

    useEffect(() => {

        const datosDashboard = async () => {

            const roles = await fetch("http://127.0.0.1:8002/api/roles", { method: "GET", headers: { Authorization: `Bearer ${Cookies.get("token")}`, }, })
            const rols = await roles.json();
            setRoles(rols);
            const users = await fetch("http://127.0.0.1:8002/api/usuario", { method: "GET", headers: { Authorization: `Bearer ${Cookies.get("token")}`, }, })
            const usuario = await users.json();
            setUsers(usuario);
            const bita = await fetch("http://127.0.0.1:8002/api/bitacoras", { method: "GET", headers: { Authorization: `Bearer ${Cookies.get("token")}`, }, })
            const bitacoras = await bita.json();
            setBitacoras(bitacoras);
            const pages = await fetch("http://127.0.0.1:8002/api/paginas", { method: "GET", headers: { Authorization: `Bearer ${Cookies.get("token")}`, }, })
            const paginas = await pages.json();
            setPaginas(paginas);
            const id = await fetch(`http://localhost:8002/api/usuario/${parseInt(iduser)}`, { method: "GET", headers: { Authorization: `Bearer ${Cookies.get("token")}`, }, })
            const user = await id.json();
            setUsuario(user.usuario);
            setInformacion(user.informacion);
            const rol = await fetch(`http://127.0.0.1:8002/api/roles/${parseInt(iduser)}`, { method: "GET", headers: { Authorization: `Bearer ${Cookies.get("token")}`, }, })
            const roluser = await rol.json();
            setRol(roluser.rol);

        }

        datosDashboard();
        const intervalId = setInterval(datosDashboard, 2000);
        return () => clearInterval(intervalId);

    }, [iduser, seccion]);

    const contextValue = {
        seccion,
        setEmail,
        password,
        handleSubmit,
        error,
        setPassword,
        roles,
        usuario,
        iduser,
        email,
        users,
        bitacoras,
        paginas,
        informacion,
        rol,
    };

    return (
        <ManagementContext.Provider value={contextValue}>
            {children}
        </ManagementContext.Provider>
    );
};
