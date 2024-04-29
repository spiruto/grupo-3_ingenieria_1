
import { getComponent } from "../../view-engine.js"
import Products from "../../../../data/products.json" with {type: "json"}

document.addEventListener("DOMContentLoaded", async () => {
    await renderLayout();
    getListOfProducts();
    hideLogins();
});

function getListOfProducts() {
    const apiUrl = 'https://tienda.com/api/inventory';
        // Make a GET request using fetch
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) 
            throw new Error();
        
        return response.json();
    })
    .then(data => {
        renderLayout2(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    });
        
}

async function renderLayout() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("cat");
    const productSearch = params.get("search");
    const bodyEl = document.getElementById("root");
    const components = {};
    components["nav"] = await getComponent("nav");
    components["footer"] = await getComponent("footer");
    const filteredProducts = Products.filter(p =>
        p.title.toLowerCase().includes(productSearch && productSearch.toLowerCase().trim() || "")
        && ((category && category.toLowerCase().trim() === p.category.toLowerCase()) || !category));
    
    bodyEl.innerHTML = `${components.nav} ${components.footer}`;
    renderLayout2();
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

async function renderLayout2(data) {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("cat");
    const productSearch = params.get("search");
    const bodyEl = document.getElementById("root");
    const components = {};
    components["nav"] = await getComponent("nav");
    components["footer"] = await getComponent("footer");
    const filteredProducts = Products.filter(p =>
        p.title.toLowerCase().includes(productSearch && productSearch.toLowerCase().trim() || "")
        && ((category && category.toLowerCase().trim() === p.category.toLowerCase()) || !category));


    const gridEl = `
    <div class="wrapper-2">
        <h2 style="text-align: center;margin-top:1%;">
            ${productSearch ? "Mostrando resultados para '" + productSearch + "'" : "Todos los Productos"}
        </h2>
        ${filteredProducts.length===0?"<p style='text-align:center;margin-top:20px;'>Lo sentimos, no hay resultados para tu busqueda...</p>":""}
        <div class="product-grid">
        ${data.map(inventory =>
            `<div class="product-item">
                <img src="${inventory.product && inventory.product.imageUrl ? inventory.product.imageUrl : 'placeholder_image_url'}" alt="${inventory.product && inventory.product.name ? inventory.product.name : 'Product Name'}">
                <div class="product-content">
                    <h3>${inventory.product && inventory.product.name ? inventory.product.name : 'Product Name'}</h3>
                    <p style="color:orange;"><b>${inventory.product && inventory.product.price ? inventory.product.price : 'Price'}</b></p>
                    <a class="productBtn" onclick="openPopup2(this)" product-id="${inventory.product._id}" product-label="${inventory.product.name}" product-price="${inventory.product.price}" product-desc="${inventory.product.description}" product-max="${inventory.quantity}">Agregar a Carrito</a>
                </div>
            </div>`
        ).join("")}
        </div>
    </div>
    `

    const popup = `
        <!-- The pop-up content -->
        <div class="overlay" id="overlay"></div>
        <div class="popup" id="popup">
            <h2 id="product-label"></h2>
            <p id="product-desc"></p>
            <p style="display: none" id="product-id"></p>
            <p id="product-price"></p>
            <p id="product-max"></p>
            <input id="quantity-input" type="number"  value="1" min="1">
            <button onclick="closePopup()">Close</button>
            <button onclick="addToCart()">Add to cart</button>
        </div>
    `

    bodyEl.innerHTML = `${components.nav} ${gridEl} ${popup} ${components.footer}`;
    
    
    hideLogins();
}

