import {
  guardarCarrito,
  obtenerCarrito,
  vaciarCarritoStorage,
  obtenerStockDisponible,
  descontarStock,
  reponerStock,
} from "./storage.js";

import { actualizarContador, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
  const stockDisponible = obtenerStockDisponible(producto.id, producto.stock);

  if (stockDisponible <= 0) {
    mostrarMensaje("No hay stock disponible para este producto");
    return false;
  }

  const carrito = obtenerCarrito();

  const productoExistente = carrito.find((item) => item.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1,
    });
  }

  descontarStock(producto.id);
  guardarCarrito(carrito);
  actualizarContador(carrito);

  mostrarMensaje("Producto agregado 🎉");
  return true;
};

export const eliminarProducto = (indice) => {
  const carrito = obtenerCarrito();
  const producto = carrito[indice];

  if (!producto) return;

  if (producto.cantidad > 1) {
    producto.cantidad--;
    mostrarMensaje("Se eliminó una unidad");
  } else {
    carrito.splice(indice, 1);
    mostrarMensaje("Producto eliminado ✅");
  }

  reponerStock(producto.id, 1);
  guardarCarrito(carrito);
  actualizarContador(carrito);
};

export const vaciarCarrito = () => {
  const carrito = obtenerCarrito();

  carrito.forEach((producto) => {
    reponerStock(producto.id, producto.cantidad || 1);
  });

  vaciarCarritoStorage();
  actualizarContador([]);
  mostrarMensaje("Carrito vaciado");
};

export const finalizarCompra = () => {
  const carrito = obtenerCarrito();

  if (!carrito.length) {
    mostrarMensaje("Tu carrito está vacío");
    return false;
  }

  vaciarCarritoStorage();
  actualizarContador([]);

  mostrarMensaje("¡Compra finalizada! Gracias por tu pedido 🎉");
  return true;
};
