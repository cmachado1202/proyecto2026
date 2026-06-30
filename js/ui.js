export const actualizarContador = (carrito) => {
  const contador = document.getElementById("contador-carrito");

  if (!contador) return;

  const totalProductos = carrito.reduce((acumulador, producto) => {
    return acumulador + (producto.cantidad || 1);
  }, 0);

  contador.textContent = totalProductos;
};

export const mostrarMensaje = (texto) => {
  alert(texto);
};
