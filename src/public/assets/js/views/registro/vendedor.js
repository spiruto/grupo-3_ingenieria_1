import { getComponent } from "../../view-engine.js";


document.addEventListener("DOMContentLoaded", async () => {
     await renderLayout();
     //setupFormSubmission();
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
        "userType": "Vendedor"
            
    }
    await sendDataToMongoDB(data).then (()=> {
        alert("Vendedor creado correctamente, espere aprovacion de Admin")
         (window.location.href = "https://tienda.com");
    });
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
