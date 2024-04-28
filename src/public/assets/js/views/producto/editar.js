// Autor => Daniel Quesada Arias

import { getComponent } from "../../view-engine.js"

document.addEventListener("DOMContentLoaded", async () => {
    await renderLayout();
    hideLogins();
    showProduct();
    
    let myButton = document.getElementById('myButton');
    myButton.addEventListener('click', handleClick);
});

async function renderLayout() {
    const bodyEl = document.getElementById("root");
    const components = {};
    components["nav"] = await getComponent("nav");
    components["footer"] = await getComponent("footer");

    bodyEl.innerHTML = `${components.nav} ${bodyEl.innerHTML} ${components.footer}`;
}

function hideLogins() {

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

function showProduct() {
    let inventory = JSON.parse(localStorage.getItem('inventory'));

    document.getElementById('name').value = inventory.product.name;
    document.getElementById('description').value = inventory.product.description;
    document.getElementById('price').value = inventory.product.price;
    document.getElementById('category').value = inventory.product.category;
    document.getElementById('imageUrl').value = inventory.product.imageUrl;
    document.getElementById('quantity').value = inventory.quantity;
}

async function handleClick() {
    
        // Obtener los valores de los campos de entrada
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const quantity = document.getElementById('quantity').value;


    let inventory = JSON.parse(localStorage.getItem('inventory'))
    var productID = inventory.product._id;

    var parsedUser = JSON.parse(localStorage.getItem("user"));
    var userID = parsedUser._id;

    const updatedProduct = {
        "name": name,
        "description": description,
        "price": price,
        "category": category,
        "imageUrl": imageUrl
    };

    const updatedInventory = {
        product: productID, 
        seller: userID, 
        quantity: quantity
    };

    // Realizar la solicitud PUT al servidor
    fetch('https://tienda.com/api/product/' +  productID, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
    })
    .then(response => {
        
        fetch('https://tienda.com/api/inventory/' +  inventory._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedInventory)
        }).then(response => {
            localStorage.removeItem('inventory');
            window.location.href = 'https://tienda.com/perfil/vendedor/productos.html';
        });
        
    })
    .catch ((error) => {
        console.error('Error:', error);
    });
    
}
