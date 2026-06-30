import { obtenerCarrito } from "./storage.js";
import {
  eliminarProducto,
  vaciarCarrito,
  finalizarCompra,
} from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const formatearPrecio = (precio) => {
  return `$${Number(precio).toLocaleString("es-AR")}`;
};

const obtenerRutaImagen = (imagen) => {
  if (!imagen) return "";

  if (imagen.startsWith("http")) {
    return imagen;
  }

  return `../${imagen.replace(/^\.?\//, "")}`;
};

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();

  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const divAcciones = document.getElementById("acciones-carrito");
  const resumen = document.getElementById("resumen-carrito");

  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";
  resumen.innerHTML = "";

  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "Tu carrito está vacío 😢";

    contenedor.appendChild(mensaje);
    return;
  }

  let totalCompra = 0;

  carrito.forEach((producto, index) => {
    const cantidadProducto = producto.cantidad || 1;
    const subtotal = Number(producto.precio) * cantidadProducto;

    totalCompra += subtotal;

    const tarjeta = document.createElement("article");
    tarjeta.classList.add("card", "text-dark");

    const img = document.createElement("img");
    img.src = obtenerRutaImagen(producto.img);
    img.alt = producto.nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.textContent = `Precio unitario: ${formatearPrecio(producto.precio)}`;

    const cantidad = document.createElement("p");
    cantidad.classList.add("cantidad-producto");
    cantidad.textContent = `Cantidad: ${cantidadProducto}`;

    const subtotalProducto = document.createElement("p");
    subtotalProducto.classList.add("subtotal-producto");
    subtotalProducto.textContent = `Subtotal: ${formatearPrecio(subtotal)}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger");
    btnEliminar.textContent = "Eliminar una unidad";

    btnEliminar.addEventListener("click", () => {
      eliminarProducto(index);
      renderizarCarrito();
    });

    tarjeta.append(
      img,
      titulo,
      precio,
      cantidad,
      subtotalProducto,
      btnEliminar,
    );

    contenedor.appendChild(tarjeta);
  });

  const total = document.createElement("p");
  total.classList.add("total-carrito");
  total.textContent = `Total de la compra: ${formatearPrecio(totalCompra)}`;

  resumen.appendChild(total);

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn", "btn-secondary");
  btnVaciar.textContent = "Vaciar carrito";

  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  const btnFinalizar = document.createElement("button");
  btnFinalizar.classList.add("btn", "btn-success");
  btnFinalizar.textContent = "Finalizar compra";

  btnFinalizar.addEventListener("click", () => {
    const compraFinalizada = finalizarCompra();

    if (compraFinalizada) {
      renderizarCarrito();
    }
  });

  divAcciones.append(btnVaciar, btnFinalizar);
};

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});
