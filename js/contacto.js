import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const formulario = document.getElementById("form-contacto");
  const mensajeFormulario = document.getElementById("mensaje-formulario");

  if (!formulario || !mensajeFormulario) return;

  formulario.addEventListener("submit", (event) => {
    if (!formulario.checkValidity()) {
      event.preventDefault();

      mensajeFormulario.textContent =
        "Revisá los campos obligatorios antes de enviar el formulario.";

      formulario.reportValidity();
      return;
    }

    mensajeFormulario.textContent = "Enviando consulta...";
  });

  formulario.addEventListener("input", () => {
    mensajeFormulario.textContent = "";
  });
});
