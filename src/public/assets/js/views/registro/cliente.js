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

document.addEventListener("DOMContentLoaded", async () => {
  await renderLayout();
    setupFormSubmission();
    hideLogins();
    document.getElementById('botonRegistro').addEventListener(
      'click', setupFormSubmission);
    });

async function renderLayout() {
  const bodyEl = document.getElementById("root");
  const components = {};
  components["nav"] = await getComponent("nav");
  components["footer"] = await getComponent("footer");
  bodyEl.innerHTML = `${components.nav} ${bodyEl.innerHTML} ${components.footer}`;
  validateForm("formulario-registro", validationRules);
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
  "address":document.getElementById("address").value
  /*profileImage:document.getElementById("imagen"),*/
  
  /*permitPDF:document.getElementById("nombre")*/
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


function hideLogins () {

  console.log("ENTRO A LA FUNCION");
  // Supongamos que tienes un objeto guardado en localStorage con la clave "miObjeto"
  var user = localStorage.getItem("user");

  var login1 = document.getElementById("cuenta-perfil");
  var login2 = document.getElementById("cuenta-perfil-logged-cliente");
  var login3 = document.getElementById("cuenta-perfil-logged-vendedor");
  var login4 = document.getElementById("cuenta-perfil-logged-admin");

  // Verificar si el objeto existe en localStorage
  if (!user) {
      login2.style.display = "none";
      login3.style.display = "none";
      login4.style.display = "none";
      return;
  }
  user = JSON.parse(user);
  login1.style.display = "none";
   if (user.userType === 'Cliente') {
      login3.style.display = "none";
   } else if (user.userType === "Vendedor"){
      login2.style.display = "none";
   } else if (user.userType === "admin"){
    login2.style.display = "none";
    login3.style.display = "none";
   }
  }
