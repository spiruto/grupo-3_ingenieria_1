import { getComponent } from "../../view-engine.js"

document.addEventListener("DOMContentLoaded", async () => {
    await renderLayout();
     hideLogins ();

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
    getUserData3();
}

function getUserData3() {
    var user = JSON.parse(localStorage.getItem("user"));
    setValue("nombre", user.name);
    setValue("apellidos", user.lastName);
    setValue("correo", user.email);
    setValue("telefono", user.phone);
    setValue("nationalId", user.nationalId);
    setValue("contrasena", user.password);
    setValue("direccion", user.address);
    
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

        // Puedes agregar aquí cualquier código que quieras ejecutar al cargar la página
}

function checkUserStatus() {
    
    var usuarioActivo = true; // Cambia esto según tu lógica de usuario activo

    if (usuarioActivo) {
        // Si el usuario está activo, ocultamos el sidebar
        document.getElementById("sidebar").style.display = "none";
    }
}

 function hidesidebar(){
    
    var user = JSON.parse(localStorage.getItem("user"));
    
    if (!user.approved){
        console.log(
            user.approved
        )
        document.getElementById("sidebarDash").style.display = "none";
    }
 }