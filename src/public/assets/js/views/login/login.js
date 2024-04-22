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
        const response = await fetch(url, {
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
        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;
        
        const apiUrl = 'https://localhost/api/login';
        const postDataExample = {"email": email, "password": password};
        
        const response = await postData(apiUrl, postDataExample);
        
        console.log("response.status =", response.status);
        console.log("response.body =", response.body);
        
        if (response.status !== 200) {
            alert("Invalid User or password");
            return;
        }
        
        localStorage.setItem("user", JSON.stringify(response.body));
        console.log(localStorage.getItem("user"));
    } catch (error) {
        alert("No login");
    }
}

const button = document.getElementById("myButton");
button.addEventListener("click", handleClick);

}
