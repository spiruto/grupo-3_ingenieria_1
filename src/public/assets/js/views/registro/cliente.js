import { getComponent } from "../../view-engine.js"
import validations from "../../validations.js"
import validateForm from "../../formValidator.js";

const validationRules = {
  nombre: [
      validations.required
  ],
  apellido: [
      validations.required
  ],
  correo: [
      validations.required
  ],
  identificacion: [
      validations.required
  ],
  telefono: [
    validations.required
  ],
  direccion: [
    validations.required
  ],
  contrasena: [
    validations.required,
    validations.minLength(8),
    value => /\d/.test(value) || 'La contraseña debe tener por lo menos un número.',
    value => /^(?=.*[bcdfghjklmnpqrstvwxyz]).+$/.test(value) || 'La contraseña debe tener por lo menos una consonante.',
    value => /^(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>?]).+$/.test(value) || 'La contraseña debe tener por lo menos un carácter especial.'
  ],
  confirmar_contrasena: [
    validations.required
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  renderLayout();
});

async function renderLayout() {
  const bodyEl = document.getElementById("root");
  const components = {};
  components["nav"] = await getComponent("nav");
  components["footer"] = await getComponent("footer");
  bodyEl.innerHTML = `${components.nav} ${bodyEl.innerHTML} ${components.footer}`;
  validateForm("formulario-registro", validationRules);
}
