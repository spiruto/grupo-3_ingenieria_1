import { getComponent } from "../../view-engine.js";

document.addEventListener("DOMContentLoaded", () => {
  renderLayout();
});

async function renderLayout() {
  const bodyEl = document.getElementById("root");
  const components = {};
  components["nav"] = await getComponent("nav");
  components["footer"] = await getComponent("footer");
  let layout = "";
  Object.values(components).forEach((component) => {
    layout += component;
  });
  bodyEl.innerHTML = `${components.nav} ${bodyEl.innerHTML} ${components.footer}`;

  getUserData2();
}

//metodo get //

function getUserData2() {
  var user = JSON.parse(localStorage.getItem("user"));
  setValue("nombre", user.name);
  setValue("apellidos", user.lastName);
  setValue("correo", user.email);
  setValue("telefono", user.phone);
  setValue("nationalId", user.nationalId);
  setValue("contrasena", user.password);
  

}

function setValue(id, value) {
      const parentElement = document.getElementById(id);
      const paragraphElement = parentElement.querySelector('span');
      paragraphElement.textContent = value;
}

async function getUserData() {
  try {
      const apiUrl = 'https://tienda.com/api/user'; // Endpoint para obtener datos del usuario
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
          throw new Error('Network response was not ok.');
      }
      
      return response.json();
  } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to fetch user data');
  }
}

// Función para mostrar los datos del usuario en la página
async function showUserProfile() {
  try {
      const userData = await getUserData();
      
      // Rellenar los campos del perfil con los datos del usuario
      document.getElementById("nombre").textContent = userData.name;
      document.getElementById("apellidos").textContent = userData.lastName;
      document.getElementById("correo").textContent = userData.email;
      document.getElementById("telefono").textContent = userData.phone || "N/A";
      document.getElementById("direccion").textContent = userData.address || "N/A";
  } catch (error) {
      console.error('Error:', error);
      alert("No se pudo cargar el perfil del usuario");
  }
}

// Evento al cargar la página
//window.addEventListener("load", showUserProfile);