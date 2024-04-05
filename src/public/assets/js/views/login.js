import { getComponent } from "../view-engine.js";
import validations from "../../validations.js";
import validateForm from "../formValidator.js";

const validationRules = {
    email: [
        { 
            validate: value => value.trim().length > 0, 
            message: "Email is required" 
        }
    ],
    password: [
        { 
            validate: value => value.trim().length > 0, 
            message: "Password is required" 
        }
    ]
};

document.addEventListener("DOMContentLoaded", async () => {
    await renderLayout();
    validateForm("formRegistroVendedor", validationRules);
});

async function renderLayout() {
    const bodyEl = document.getElementById("root");
    const components = {};
    components["nav"] = await getComponent("nav");
    components["footer"] = await getComponent("footer");
    
    let layout = Object.values(components).join(""); // Join components into a single string
    bodyEl.innerHTML = layout + bodyEl.innerHTML; // Add components to the beginning of bodyEl's content
}
