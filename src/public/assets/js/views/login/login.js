import { getComponent } from "../../view-engine.js";



document.addEventListener("DOMContentLoaded", () => {
    renderLayout();
});

async function renderLayout() {
    const bodyEl = document.getElementById("root");
    const components = {};
    components["nav"] = await getComponent("nav");
    components["footer"] = await getComponent("footer");
    bodyEl.innerHTML = `${components.nav} ${bodyEl.innerHTML} ${components.footer}`;

    // Obtener el botón "crear cuenta"
    const crearCuentaBtn = document.querySelector('input[value="crear cuenta"]');

    // Agregar un manejador de eventos para el clic en el botón "crear cuenta"
    crearCuentaBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        // Redirigir a una nueva página
        window.location.href = "/registro/mainRegistro/";
    });
}
