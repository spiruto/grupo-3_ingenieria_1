import { getComponent } from "../../view-engine.js";
//import validateForm from "../../formValidator.js";

/*const validationRules = {
  numeroTarjeta[validations.required, value => value.length == 16 || "Debe tener 16 números"
  ],
  nombreTarjeta[validations.required],
  vencimientoTarjeta[validations.required],
  cvc[validations.required, value => value.length == 3 ||"Debe tener 3 números"]
};*/


document.addEventListener("DOMContentLoaded", async () => {
  await renderLayout();
  hideLogins();
  // Busca el formulario por su ID y agrega un evento de envío
  document.getElementById('agregarTarjetaForm').addEventListener(
    'submit', handleSubmitForm);
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

}
async function handleSubmitForm(event) {
  event.preventDefault(); // Previene el comportamiento predeterminado del formulario

  // Llama a setupFormSubmission para enviar los datos
  await setupFormSubmission();
}

//Funcion para enviar metodo de pago a la BD //

async function setupFormSubmission() {
  const cardNumber = document.getElementById("card-number").value;
  const name = document.getElementById("card-name").value;
  const expirationDate = document.getElementById("card-expiry").value;
  const cvc = document.getElementById("card-cvc").value;

  let data = {
      "name": name,
      "cardNumber": cardNumber,
      "expirationDate": expirationDate,
      "cvc": cvc
  };

  await sendDataToMongoDB(data);
}

async function sendDataToMongoDB(data) {
  try {
      const response = await fetch("https://tienda.com/api/paymentMethod", { 
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