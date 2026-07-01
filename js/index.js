import { agregarAlCarrito } from "./funcionesCarrito.js";
import {
  obtenerCarrito,
  inicializarStockProductos,
  obtenerStockDisponible,
} from "./storage.js";
import { actualizarContador } from "./ui.js";

const URL_PRODUCTOS = "https://dummyjson.com/products?limit=9";

const alfajores = [
  {
    nombre: "Nuevo Alfajor GOAT",
    precio: 3000,
    img: "./img/goat.jpg",
  },
  {
    nombre: "Alfajor Triple Bon o Bon Blanco",
    precio: 1200,
    img: "./img/bonobont.jpg",
  },
  {
    nombre: "Alfajor Triple Mantecol",
    precio: 1300,
    img: "./img/mantecolt.jpg",
  },
  {
    nombre: "Alfajor Triple Rasta Trico",
    precio: 2500,
    img: "./img/trico.jpg",
  },
  {
    nombre: "Alfajor Triple Red Velvet",
    precio: 1900,
    img: "./img/redbelvet.jpg",
  },
  {
    nombre: "Alfajor Triple Shot Chocolate Blanco",
    precio: 1600,
    img: "./img/trishot.jpg",
  },
  {
    nombre: "Alfajor Simple Pescado Raúl",
    precio: 1400,
    img: "./img/pescadoraul.jpg",
  },
  {
    nombre: "Alfajor Terrabusi",
    precio: 1000,
    img: "./img/terrabusi.jpg",
  },
  {
    nombre: "Alfajor Milka Dulce de Leche Blanco",
    precio: 1200,
    img: "./img/milkasdlblanco.jpg",
  },
];

const crearProductos = (productosAPI) => {
  return productosAPI.map((productoAPI, index) => {
    return {
      id: `dummy-${productoAPI.id}`,
      nombre: alfajores[index].nombre,
      precio: alfajores[index].precio,
      img: alfajores[index].img,
      stock: productoAPI.stock,
    };
  });
};

const renderizarProductos = (productos) => {
  const contenedor = document.getElementById("contenedor-tarjetas");

  contenedor.innerHTML = "";

  productos.forEach((producto) => {
    const stockDisponible = obtenerStockDisponible(producto.id, producto.stock);

    const tarjeta = document.createElement("article");
    tarjeta.classList.add("card", "text-dark");

    const img = document.createElement("img");
    img.src = producto.img;
    img.alt = producto.nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.textContent = `$${producto.precio}`;

    const stock = document.createElement("p");
    stock.classList.add("stock-producto");

    if (stockDisponible > 0) {
      stock.textContent = `Stock disponible: ${stockDisponible}`;
    } else {
      stock.textContent = "Sin stock";
      stock.classList.add("sin-stock");
    }

    const boton = document.createElement("button");
    boton.classList.add("btn", "btn-primary");
    boton.textContent = "Agregar al carrito";
    boton.disabled = stockDisponible === 0;

    boton.addEventListener("click", () => {
      const agregado = agregarAlCarrito(producto);

      if (agregado) {
        renderizarProductos(productos);
      }
    });

    tarjeta.append(img, titulo, precio, stock, boton);
    contenedor.appendChild(tarjeta);
  });
};

const cargarProductos = () => {
  const contenedor = document.getElementById("contenedor-tarjetas");

  contenedor.innerHTML = "<p>Cargando productos...</p>";

  fetch(URL_PRODUCTOS)
    .then((res) => {
      if (!res.ok) {
        throw new Error("No se pudieron cargar los productos");
      }

      return res.json();
    })
    .then((data) => {
      const productos = crearProductos(data.products);

      inicializarStockProductos(productos);
      renderizarProductos(productos);
    })
    .catch((error) => {
      console.error("Error:", error);

      contenedor.innerHTML =
        "<p>No se pudieron cargar los productos. Intentá nuevamente.</p>";
    });
};

document.addEventListener("DOMContentLoaded", () => {
  actualizarContador(obtenerCarrito());
  cargarProductos();
});
