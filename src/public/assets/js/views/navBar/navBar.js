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

