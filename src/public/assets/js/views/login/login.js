import { getComponent } from "../../view-engine.js";



document.addEventListener("DOMContentLoaded", async () => {
    await renderLayout();
    hideLogins();
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
        
        const apiUrl = 'https://tienda.com/api/login';
        const postDataExample = {"email": email, "password": password};
        
        const response = await postData(apiUrl, postDataExample);
        
        console.log("response =", response);
        

        if (response.message === "Invalid email or password") {
            alert("Invalid User or password");
            return;
        }
        
        localStorage.setItem("user", JSON.stringify(response));
        console.log(localStorage.getItem("user"));

        // Redireccionar a otra página
        window.location.href = "https://tienda.com/";

        // Mostrar alerta de usuario ingresado correctamente
        alert("Usuario ingresado correctamente");
    } catch (error) {
        alert("Usuario o contraseña incorrectos");
    }
}

const button = document.getElementById("myButton");
button.addEventListener("click", handleClick);
}


function hideLogins() {

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
        login4.style.display = "none";
     } else if (user.userType === "Vendedor"){
        login2.style.display = "none";
        login4.style.display = "none";
     } else if (user.userType === "admin"){
      login2.style.display = "none";
      login3.style.display = "none";
     }

}