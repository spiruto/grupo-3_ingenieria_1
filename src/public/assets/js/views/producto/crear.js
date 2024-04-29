import { getComponent } from "../../view-engine.js"

document.addEventListener("DOMContentLoaded",  async () => {
    await renderLayout();
    hideLogins();
    
    let myButton = document.getElementById('myButton');
    myButton.addEventListener('click', handleClick);
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

function hideLogins() {
    var user = localStorage.getItem("user");
    var login1 = document.getElementById("cuenta-perfil");
    var login2 = document.getElementById("cuenta-perfil-logged-cliente");
    var login3 = document.getElementById("cuenta-perfil-logged-vendedor");
    var login4 = document.getElementById("cuenta-perfil-logged-admin");

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

    console.log('Entro');

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const quantity = document.getElementById('quantity').value;

    const product = {
        "name": name,
        "description": description,
        "price": price,
        "category": category,
        "imageUrl": imageUrl
    };

    var parsedUser = JSON.parse(localStorage.getItem("user"));
    var userID = parsedUser._id;

    console.log(parsedUser);
    console.log(userID);

    const inventory = {
        product: null,
        quantity: quantity,
        seller: userID
    };

    fetch('https://tienda.com/api/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        var newProduct = data;

        inventory.product = newProduct._id;
        fetch('https://tienda.com/api/inventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inventory)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            window.location.href = 'https://tienda.com/perfil/vendedor/productos.html';
        })
    })
    .catch ((error) => {
        console.error('Error:', error);
    });

}
