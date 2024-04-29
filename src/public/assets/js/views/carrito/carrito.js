import { getComponent } from "../../view-engine.js";

document.addEventListener("DOMContentLoaded", async() => {
  await renderLayout();
  //hideLogins ();
  loadProducts();

  var buttons = document.getElementsByClassName("actionButton");

  // Loop through all the buttons
  for (var i = 0; i < buttons.length; i++) {
      // Add a click event listener to each button
      buttons[i].addEventListener('click', buttonClick);
  }
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

function onLoadFunction() {

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

  function loadProducts() {
    console.log("ENTRO A LA FUNCION 222");


    let cart = localStorage.getItem("cart");
    if (!cart) 
      return;
    
    cart = JSON.parse(cart);
    cart.forEach(product => {
      let total = product.qty * product.price;

      const row = document.createElement('tr');
          row.innerHTML = `
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.qty}</td>
          <td>${total}</td>
          <td><button class="actionButton" product-id="${product.id}" > Eliminar </button></td> 
      `;

      document.getElementById('tableBody').appendChild(row);
    });

    var total = cart.reduce((sum, product) => {
      return (sum + (product.price * product.qty));
    }, 0);

    var sum = cart.reduce((sum, product) => {
      return sum + 1;
    }, 0);

    const finalRow = document.createElement('tr');
    finalRow.innerHTML = `
      <td>${sum}</td>
      <td>N/A</td>
      <td>N/A</td>
      <td>${total}</td>
      <td>N/A</td> 
    `;

    document.getElementById('tableBody').appendChild(finalRow);
  }

  function buttonClick(element) {
    var productId = element.target.getAttribute("product-id");
    let cart = localStorage.getItem("cart");
    if (!cart) 
      return;
    
    cart = JSON.parse(cart);

    var array = cart.filter(product => {
      return product.id != productId;
    });

    localStorage.setItem("cart", JSON.stringify(array));
    location.reload();
  }