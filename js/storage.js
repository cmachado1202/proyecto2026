const KEY_CARRITO = "carrito";
const KEY_STOCK = "stockProductos";

export const guardarCarrito = (carrito) => {
  localStorage.setItem(KEY_CARRITO, JSON.stringify(carrito));
};

export const obtenerCarrito = () => {
  return JSON.parse(localStorage.getItem(KEY_CARRITO)) || [];
};

export const vaciarCarritoStorage = () => {
  localStorage.removeItem(KEY_CARRITO);
};

const obtenerStockGuardado = () => {
  return JSON.parse(localStorage.getItem(KEY_STOCK)) || {};
};

const guardarStock = (stock) => {
  localStorage.setItem(KEY_STOCK, JSON.stringify(stock));
};

export const inicializarStockProductos = (productos) => {
  const stockGuardado = obtenerStockGuardado();
  let huboCambios = false;

  productos.forEach((producto) => {
    if (stockGuardado[producto.id] === undefined) {
      stockGuardado[producto.id] = Number(producto.stock) || 0;
      huboCambios = true;
    }
  });

  if (huboCambios) {
    guardarStock(stockGuardado);
  }
};

export const obtenerStockDisponible = (id, stockInicial = 0) => {
  const stockGuardado = obtenerStockGuardado();

  if (stockGuardado[id] === undefined) {
    stockGuardado[id] = Number(stockInicial) || 0;
    guardarStock(stockGuardado);
  }

  return Number(stockGuardado[id]) || 0;
};

export const descontarStock = (id) => {
  const stockGuardado = obtenerStockGuardado();

  if (stockGuardado[id] > 0) {
    stockGuardado[id]--;
    guardarStock(stockGuardado);
  }
};

export const reponerStock = (id, cantidad = 1) => {
  const stockGuardado = obtenerStockGuardado();

  stockGuardado[id] = (Number(stockGuardado[id]) || 0) + cantidad;

  guardarStock(stockGuardado);
};
