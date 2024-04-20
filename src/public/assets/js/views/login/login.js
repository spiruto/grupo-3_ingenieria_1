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

    // Obtener el botón "crear cuenta"
    //const crearCuentaBtn = document.querySelector('input[value="crear cuenta"]');

    // Agregar un manejador de eventos para el clic en el botón "crear cuenta"
    crearCuentaBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        // Redirigir a una nueva página
        window.location.href = "/registro/mainRegistro/";
    });

}

function handleClick() {
    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }
      let email = document.getElementById("emailInput");
      let password = document.getElementById("passwordInput");
      
      // Example usage:
      const apiUrl = 'https://tienda.com/api/login';
      const postDataExample = {"email": email, "password": password};
      
      postData(apiUrl, postDataExample)
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            alert("NO login");
        });

}

const button = document.getElementById("myButton");
button.addEventListener("click", handleClick);