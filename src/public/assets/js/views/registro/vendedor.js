import { getComponent } from "../../view-engine.js";
import validations from "../../validations.js";
import validateForm from "../../formValidator.js";

const validationRules = {
    nombre: [validations.required],
    apellidos: [validations.required],
    email: [validations.required],
    numeroCedula: [validations.required],
    direccion: [validations.required],
    password: [validations.required],
    confirm_password: [validations.required, (value, formData) => validations.confirmPassword(value, formData)],
    comercio: [validations.required],
    imagen: [
        validations.required,
        (value) => {
            const allowedExtensions = ['.jpg', '.jpeg'];
            const extension = value.substr(value.lastIndexOf('.')).toLowerCase();
            return allowedExtensions.includes(extension) || 'Solo se permiten archivos JPG.';
        }
    ],
    permisos: [
        validations.required,
        (value) => {
            const allowedExtensions = ['.pdf'];
            const extension = value.substr(value.lastIndexOf('.')).toLowerCase();
            return allowedExtensions.includes(extension) || 'Solo se permiten archivos PDF.';
        }
    ],
};

document.addEventListener("DOMContentLoaded", async () => {
    await renderLayout();
    setupFormSubmission();
    document.getElementById('botonRegistro').addEventListener(
        'click', setupFormSubmission);
    });

async function renderLayout() {
    const bodyEl = document.getElementById("root");
    const components = {};
    components["nav"] = await getComponent("nav");
    components["footer"] = await getComponent("footer");
    bodyEl.innerHTML = `${components.nav} ${bodyEl.innerHTML} ${components.footer}`;
    validateForm("formRegistroVendedor", validationRules);
}

async function setupFormSubmission() {
    const cedulaNacional = document.querySelector('#cedulaNacional');
    const dimex = document.querySelector('#dimex');

    let documentType = "";

    if (cedulaNacional.checked) {
   
    documentType = cedulaNacional.value;
} else {
    documentType = dimex.value;
}

    let data = {
        "name": document.getElementById("nombre").value,
        "lastName":document.getElementById("apellidos").value,
        "email":document.getElementById("email").value,
        "nationalId":document.getElementById("numeroCedula").value,
        "nationalIdType":documentType,
        "password": document.getElementById("password").value,
        /*profileImage:document.getElementById("imagen"),*/
        "userType": Vendedor
        /*** permitPDF:document.getElementById("nombre")*/
    }
    await sendDataToMongoDB(data);
}

async function sendDataToMongoDB(data) {
    try {
        const response = await fetch("https://tienda.com/api/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Hubo un problema al procesar la solicitud.');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
}