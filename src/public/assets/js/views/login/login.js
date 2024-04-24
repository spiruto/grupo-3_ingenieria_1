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
}

 // Obtener el botón "crear cuenta"
 /*const crearCuentaBtn = document.querySelector('input[value="crear cuenta"]');
    
 // Agregar un manejador de eventos para el clic en el botón "crear cuenta"
 crearCuentaBtn.addEventListener("click", (event) => {
     event.stopPropagation();
     
     // Redirigir a una nueva página
     window.location.href = "/registro/mainRegistro/";
 });

    // Obtener el botón "crear cuenta"
    //const crearCuentaBtn = document.querySelector('input[value="crear cuenta"]');

    // Agregar un manejador de eventos para el clic en el botón "crear cuenta"
    crearCuentaBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        // Redirigir a una nueva página
        window.location.href = "/registro/mainRegistro/";
    });
*/

async function postData(url = '', data = {}) {
    try {
        const response =  fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        
        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch');
    }
}

// Handle click event

async function handleClick() {
    try {
        const apiUrl = 'https://tienda.com/api/login'; // Endpoint para obtener datos del usuario
        const response = await postData(apiUrl);
        
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        
        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch user data');
    }
}

// Mostrar datos del usuario en la página
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
/*window.addEventListener("load", showUserProfile);*/

const button = document.getElementById("myButton");
button.addEventListener("click", handleClick);
