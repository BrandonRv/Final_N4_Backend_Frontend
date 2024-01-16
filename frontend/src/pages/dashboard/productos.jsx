import { React, useEffect, useState } from "react";

export function Productos() {

    const [datosfetch, setDatosfetch] = useState([]);

    const datosBreves = async () => {
      try {
        const res = await fetch("../../../dataPruebaFetch.json");
        const data = await res.json();
        setDatosfetch(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
  
    return (
      <div className="p-4">
        <section className="flex pt-4 pb-4">
          <button className='bg-[#4c4949a1] text-slate-50 rounded-md p-2.5 mr-2 hover:bg-[#4c49497d]' onClick={datosBreves}>
            Venta de Importación
          </button>
        </section>
        <table className="border-[1px] border-solid rounded-sm border-black shadow-xl shadow-black">
          <thead className='border-b border-black font-bold'>
            <tr>
              <td className='pl-4'>
                <input type="checkbox" id="miCheckbox" name="miCheckbox"></input>
                <label htmlFor="miCheckbox"></label>
              </td>
              <td>Nombre</td>
              <td>Apellido</td>
              <td>Pais</td>
              <td>Ciudad</td>
              <td>Deporte</td>
              <td>Trabajo</td>
            </tr>
          </thead>
  
          <tbody>
            {datosfetch.map((informacion, index) => (
              <tr key={index}>
                <td>{informacion.nombre}</td>
                <td>{informacion.apellido}</td>
                <td>{informacion.pais}</td>
                <td>{informacion.ciudad}</td>
                <td>{informacion.deporte}</td>
                <td>{informacion.trabajo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

}
export default Productos;
