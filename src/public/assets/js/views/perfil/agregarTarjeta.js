import { getComponent } from "../view-engine.js";
import validateForm from "../formValidator.js";

document.addEventListener("DOMContentLoaded", async () => {
  await renderLayout();
  hideLogins ();
});

const validationRules = {
  numeroTarjeta[validations.required, value => value.length == 16 || "Debe tener 16 números"
  ],
  nombreTarjeta[validations.required],
  vencimientoTarjeta[validations.required],
  cvc[validations.required, value => value.length == 3 ||"Debe tener 3 números"]
};

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

  validateForm("validacionTarjetaCredito", validationRules);
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