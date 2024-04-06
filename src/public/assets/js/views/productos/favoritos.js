// Autor => Daniel Quesada Arias
import { getComponent } from "../../view-engine.js"
import Products from "../../../../data/products.json" with {type: "json"}

document.addEventListener("DOMContentLoaded", () => {
    renderLayout();
});


console.log(gridEl)
async function renderLayout() {
    const bodyEl = document.getElementById("root");
    const components = {};
    components["nav"] = await getComponent("nav");
    components["footer"] = await getComponent("footer");
    const gridEl = `
    <div class="wrapper-2">
        <h2 style="text-align: center;margin-top:1%;">
            Tus Productos Favoritos
        </h2>
        <div class="product-grid">
        ${Products.map(p =>
        `
            <div class="product-item">
                <svg class="heart" xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 24 24"><path fill="currentColor" d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812Q2.775 11.5 2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412q-.975 1.313-2.625 2.963T13.45 19.7z"/></svg>
                <svg class="heart-bg" xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 24 24"><path fill="currentColor" d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812Q2.775 11.5 2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412q-.975 1.313-2.625 2.963T13.45 19.7z"/></svg>
                <img src="/assets/images/product.jpg" alt="${p.title}">
                <div class="product-content">
                    <h3>${p.title}</h3>
                    <p style="color:orange;"><b>${p.price}</b></p>
                    <a href="/producto?pid=${p.id}" class="productBtn">Ver</a>
                </div>
            </div>`
    ).join("")}
        </div>
    </div>
    `
    bodyEl.innerHTML = `${components.nav} ${gridEl} ${components.footer}`;
}