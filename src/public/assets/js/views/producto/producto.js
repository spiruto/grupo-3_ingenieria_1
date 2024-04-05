// Autor => Daniel Quesada Arias
import { getComponent } from "../../view-engine.js"
import Products from "../../../../data/products.json" with {type: "json"}

const starIcon = `<svg class="productStar" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="currentColor" d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z" /></svg>`
const starIcon2 = `<svg class="productStar" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="currentColor" d="m8.85 16.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zM5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275zM12 12.25" /></svg>`

document.addEventListener("DOMContentLoaded", () => {
    renderLayout();
});
async function renderLayout() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("pid") || Products.find(p => p.id == params.get("pid")) === undefined) {
        window.location.href = "/";
    }
    const pid = Number(params.get("pid"));
    const bodyEl = document.getElementById("root");
    const components = {};
    components["nav"] = await getComponent("nav");
    components["footer"] = await getComponent("footer");
    const product = Products.find(p => p.id === pid)
    const productoEl = `
    <div class="wrapper">
        <div id="product">
            <div id="product-top">
                <img id="product-image" src="/assets/images/product.jpg" alt="producto"/>
                <div id="product-details">
                    <div id="product-title"><h1>${product.title}  </h1> ${starIcon.repeat(4)}${starIcon2}</div>
                    <h3>${product.price}</h3>
                    <h5>Opciones</h5>
                    <ul id="product-options">
                        <li><img class="option-img" src="/assets/images/product.jpg" alt="Opcion 1"/></li>
                        <li><img class="option-img" src="/assets/images/product.jpg" alt="Opcion 2"/></li>
                        <li><img class="option-img" src="/assets/images/product.jpg" alt="Opcion 3"/></li>
                        <li><img class="option-img" src="/assets/images/product.jpg" alt="Opcion 4"/></li>
                    </ul>
                    <div>
                        <button id="btnDecrease" style="width:5%;height:30px;">-</button><input id="order-quantity" type="number" value="1" style="width:5%;height:30px;text-align:center;" min="1"/><button id="btnIncrease" style="width:5%;height:30px;">+</button>
                        <button id="add-product-btn">Agregar al Carrito</button>
                    </div>
                </div>
                <div class="social-share">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512"><path fill="currentColor" d="M384 336a63.78 63.78 0 0 0-46.12 19.7l-148-83.27a63.85 63.85 0 0 0 0-32.86l148-83.27a63.8 63.8 0 1 0-15.73-27.87l-148 83.27a64 64 0 1 0 0 88.6l148 83.27A64 64 0 1 0 384 336"/></svg>
                </div>
            </div>
            <div id="product-bottom">
           <h2> Descripcion del Producto</h2>
           <p>${product.description}</p>
            </div>
        </div>
    </div>
    `
    bodyEl.innerHTML = `${components.nav} ${productoEl} ${components.footer}`;
    document.getElementById("btnIncrease").addEventListener("click",()=>{
        increase();
    });
    document.getElementById("btnDecrease").addEventListener("click",()=>{
        decrease();
    });

}

function increase() {
    const quantity = document.getElementById("order-quantity");
    let value = Number(quantity.value);
    value += 1;
    quantity.value = value;
}
function decrease() {
    const quantity = document.getElementById("order-quantity");
    let value = Number(quantity.value);
    if (value>1) {
        value -= 1;
        quantity.value = value;
    }
}