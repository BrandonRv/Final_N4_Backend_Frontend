export function AgregarVenta() {
    return(
        <>
            <main className="flex">
            <section>
                <article>
                    <select className='bg-[#4c4949a1] text-slate-50 rounded-e-md px-1 py-1 mr-1 hover:cursor-pointer' id="opciones" name="opciones" placeholder="Accion">
                        {/* <option value="" disabled selected hidden>ALMACEN POZITOS</option> */}
                        <option value="opcion0">ALMACEN POZITOS</option>
                        <option value="opcion1">ALMACEN POZITOS 1</option>
                        <option value="opcion2">ALMACEN POZITOS 2</option>
                        <option value="opcion3">ALMACEN POZITOS 3</option>
                        <option value="opcion4">ALMACEN POZITOS 4</option>
                        </select>
                    <select className='bg-[#4c4949a1] text-slate-50 rounded-e-md px-1 py-1 mr-1 hover:cursor-pointer' id="opciones" name="opciones" placeholder="Accion">
                        {/* <option value="" disabled selected hidden>ALMACEN POZITOS</option> */}
                        <option value="opcion0">Pozitos (La Tejona)</option>
                        <option value="opcion1">Pozitos 1</option>
                        <option value="opcion2">Pozitos 2</option>
                        <option value="opcion3">Pozitos 3</option>
                        <option value="opcion4">Pozitos 4</option>
                    </select>
                    <div>
                        <label className='font-bold mx-3' for="añadir_cliente">Clientes Varios</label>
                        <button className='border-[1px] border-solid rounded-sm border-slate-400 hover:cursor-pointer' id="añadir_cliente" name="añadir_cliente">+</button>
                    </div>
                    <div>
                        <input className='border-[1px] border-solid rounded-sm border-slate-400 w-22 h-6' type="text" id='buscar' placeholder="Buscar/Escanear por Nombre/Código"/>
                    </div>
                </article>
                <table>
                    <thead>
                        <tr>
                            <td>Producto</td>
                            <td>Precio</td>
                            <td>Cantidad</td>
                            <td>Importe Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Aqui va producto</td>
                            <td>$$$$$</td>
                            <td>435</td>
                            <td>$$$$$</td>
                        </tr>
                    </tbody>
                </table>
                <article className="flex">
                    <div>
                        <p>Articulos</p>
                        <p>4 (10)</p>
                    </div>
                    <div>
                        <p>Total Bruto</p>
                        <p>4.00</p>
                    </div>
                    <div>
                        <p>Propinas</p>
                        <p>Icono</p>
                        <p>0.00</p>
                    </div>
                </article>
                <article className="flex">
                    <div>
                        <p>Descuentos</p>
                        <p>Icono</p>
                        <p>0.00</p>
                    </div>
                    <div>
                        <p>Cupón</p>
                        <p>Icono</p>
                        <p>0.00</p>
                    </div>
                    <div>
                        <p>Impuesto</p>
                        <p>Icono</p>
                        <p>0.00</p>
                    </div>
                    <div>
                        <p>Envío</p>
                        <p>Icono</p>
                        <p>0.00</p>
                    </div>
                </article>
                <article>
                    <h1>Total: 0.00</h1>
                </article>
            </section>
            <section>
                <article className="flex">
                    <p>Icono</p>
                    <p>PROFORMA</p>
                    <button>Si/No</button>
                    <button>(Icono) Configuracion de POS</button>
                    <button>(Icono) Ayuda</button>
                    <select className='hover:cursor-pointer' id="opciones" name="opciones" placeholder="Accion">
                        {/* <option value="" disabled selected hidden>ALMACEN POZITOS</option> */}
                        <option value="opcion0">(Icono) Admin</option>
                        <option value="opcion1">Admin 1</option>
                        <option value="opcion2">Admin 2</option>
                        <option value="opcion3">Admin 3</option>
                        <option value="opcion4">Admin 4</option>
                        </select>
                </article>
                <article>
                    <button className='bg-[#4c4949a1] text-slate-50 rounded-md px-2.5 py-1 mr-1 hover:bg-[#4c49497d]'>Categoría</button>
                    <button className='bg-[#4c4949a1] text-slate-50 rounded-md px-2.5 py-1 mr-1 hover:bg-[#4c49497d]'>Marca</button>
                    <button className='bg-[#4c4949a1] text-slate-50 rounded-md px-2.5 py-1 mr-1 hover:bg-[#4c49497d]'>Destacados</button>
                </article>
                <article>
                    <p>contenido</p>
                    <p>contenido</p>
                </article>
                 <article className="flex">
                    <button className='bg-[#4c4949a1] text-slate-50 rounded-s-md px-2.5 py-1 mr-1 hover:bg-[#4c49497d]'>{"<"}</button>
                    <p className='rounded-s-md px-2.5 py-1 mr-1'>1</p>
                    <button className='bg-[#4c4949a1] text-slate-50 rounded-e-md px-2.5 py-1 mr-1 hover:bg-[#4c49497d]'>{">"}</button>
                 </article>
            </section>
            </main>
            <footer>
                <button className='bg-[#4c4949a1] text-slate-50 rounded-md px-2.5 py-1 mr-1 hover:bg-[#4c49497d]'>Efectivo</button>
                <button className='bg-[#4c4949a1] text-slate-50 rounded-md px-2.5 py-1 mr-1 hover:bg-[#4c49497d]'>Por Cobrar</button>
                <button className='bg-[#4c4949a1] text-slate-50 rounded-md px-2.5 py-1 mr-1 hover:bg-[#4c49497d]'>Qr</button>
                <button className='bg-[#4c4949a1] text-slate-50 rounded-md px-2.5 py-1 mr-1 hover:bg-[#4c49497d]'>Depositos</button>
                <button className='bg-[#4c4949a1] text-slate-50 rounded-md px-2.5 py-1 mr-1 hover:bg-[#4c49497d]'>Generar Pre-Venta</button>
                <button className='bg-[#4c4949a1] text-slate-50 rounded-md px-2.5 py-1 mr-1 hover:bg-[#4c49497d]'>Cancelar</button>
                <button className='bg-[#4c4949a1] text-slate-50 rounded-md px-2.5 py-1 mr-1 hover:bg-[#4c49497d]'>Ventas Recientes</button>
                <button className='bg-[#4c4949a1] text-slate-50 rounded-md px-2.5 py-1 mr-1 hover:bg-[#4c49497d]'>Abonar Ventas</button>
                <button className='bg-[#4c4949a1] text-slate-50 rounded-md px-2.5 py-1 mr-1 hover:bg-[#4c49497d]'>PreVentas</button>
                <button className='bg-[#4c4949a1] text-slate-50 rounded-md px-2.5 py-1 mr-1 hover:bg-[#4c49497d]'>Generar Pro-Forma</button>
            
            </footer>
        </>
    )
}

export default AgregarVenta