import { getComponent } from "../view-engine.js"
import validations from "../validations.js"
import validateForm from "../formValidator.js";

const validationRules = {
    nombre:[
        validations.required
    ],
    apellidos:[
        validations.required
    ],
    email:[
        validations.required
    ],
    numeroCedula:[
        validations.required
    ],
    direccion:[
        validations.required
    ],
    password:[
        validations.required
    ],
    confirm_password:[
        validations.required, (value, formData) => validations.confirmPassword(value, formData)
    ],
    comercio:[
        validations.required
    ],
    imagen:[
        validations.required
    ],
    permisos:[
        validations.required
    ],
};

document.addEventListener("DOMContentLoaded", () => {
    renderLayout();
});

async function renderLayout() {
    const bodyEl = document.getElementById("root");
    const components = {};
    components["nav"] = await getComponent("nav");
    components["footer"] = await getComponent("footer");
    let layout = "";
    Object.values(components).forEach(component => {
        layout += component;
    });
    bodyEl.innerHTML = `${components.nav} ${bodyEl.innerHTML} ${components.footer}`;
    alidateForm("formRegistroVendedor", validationRules);
}