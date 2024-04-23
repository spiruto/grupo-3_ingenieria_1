// Definir la función que se ejecutará cuando se cargue la página
function onLoadFunction() {

    console.log("ENTRO A LA FUNCION");
    // Supongamos que tienes un objeto guardado en localStorage con la clave "miObjeto"
    var user = localStorage.getItem("user");

    var login1 = document.getElementById("cuenta-perfil");
    var login2 = document.getElementById("cuenta-perfil-logged-cliente");
    var login3 = document.getElementById("cuenta-perfil-logged-vendedor");

    // Verificar si el objeto existe en localStorage
    if (!user) {
        login2.style.display = "none";
        login3.style.display = "none";
        return;
    }
    
    login1.style.display = "none";
    console.log(user);

        // Puedes agregar aquí cualquier código que quieras ejecutar al cargar la página
}

// Agregar la función de evento directamente al evento onload del cuerpo del documento
document.body.onload = onLoadFunction;