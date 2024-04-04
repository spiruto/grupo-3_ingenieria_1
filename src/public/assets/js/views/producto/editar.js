// Autor => Daniel Quesada Arias

// import { getComponent } from "../../view-engine.js"
import validations from "../../validations.js"
import validateForm from "../../formValidator.js";

const validationRules = {
    imagen: [
        validations.required,
        value => value.length > 10 || "Debe tener minimo 10 caracteres"
    ],
    descripcion: [
        validations.required
    ],
    precio: [
        validations.required
    ],
    tarjetaCredito: [
        validations.required, validations.numericOnly, value => value.length === 16 || "El numero de tarjeta es de 16 caracteres exactos"
    ],
};

document.addEventListener("DOMContentLoaded", () => {
    renderLayout();
});

async function renderLayout() {
    const bodyEl = document.getElementById("root");
    const components = {};
    let layout = "";
    Object.values(components).forEach(component => {
        layout += component;
    });
    bodyEl.innerHTML = ` ${bodyEl.innerHTML} `;
    validateForm("form", validationRules);
}

