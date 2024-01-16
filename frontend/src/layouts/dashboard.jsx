import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Sidenav,
  DashboardNavbar,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import Cookies from "js-cookie";
import { useMaterialTailwindController} from "@/context";
import { useNavigate } from "react-router-dom";

export function Dashboard() {

  const rolSeccion = parseInt(sessionStorage.getItem("rol"));
  const [controller] = useMaterialTailwindController();
  const token = Cookies.get("token");
  const { sidenavType } = controller;
  const navigate = useNavigate();
  let tokeninvalido = "Unauthenticated."
  const body = document.body;
  const seccion = sessionStorage.getItem("Seccion")

  if (!token) {
    navigate("/auth/login");
  } else if (tokeninvalido === seccion) {
    navigate("/auth/login");
  }

  if (sidenavType === "white") {
    body.classList.remove("dark");
    body.classList.add("light");
  } else if (sidenavType === "dark") {
    body.classList.remove("light");
    body.classList.add("dark");
  } else if (sidenavType === "transparent") {
    body.classList.remove("light");
    body.classList.add("dark");
  }

  localStorage.setItem("theme", sidenavType);

  return (
    <div id='modoOzcuro' className="bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 dark:from-gray-400 dark:via-gray-200 dark:to-gray-100 dark:bg-gradient-to-r">
      <div className="min-h-screen bg-opacity-40 bg-blue-300 dark:bg-gray-300 dark:bg-opacity-50 transition-all duration-1000 ease-in-out">
        <Sidenav
          routes={routes}
        />
        <div className="p-4 xl:ml-80">
          <DashboardNavbar />
          <Routes>
            {routes.map(
              ({ layout, pages }) =>
                layout === "dashboard" &&
                pages
                  .filter((page) => page.rol === rolSeccion)
                  .map(({ path, element }) => (
                    <Route
                      exact
                      path={path}
                      element={element}
                    />
                  ))
            )}
          </Routes>
          <div className="text-blue-gray-800">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
