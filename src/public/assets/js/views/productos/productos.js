// Autor => Daniel Quesada Arias
import { getComponent } from "../../view-engine.js"
import Products from "../../../../data/products.json" with {type: "json"}

document.addEventListener("DOMContentLoaded", () => {
    renderLayout();
});
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
    const gridEl = `
    <div class="wrapper-2">
        <h2 style="text-align: center;margin-top:1%;">
            ${productSearch ? "Mostrando resultados para '" + productSearch + "'" : "Te mostramos productos al azar, para que encuentres de todo un poco..."}
        </h2>
        <div id="controls">
            <select id="categories" onchange="(event=>{window.location.href='/?cat='+event.target.value;})(event)">
            <option value="">Todas las Categorias</option>
                <optgroup label="Tierra">
                    <option value="Vegetales">Vegetales</option>
                    <option value="Frutas">Frutas</option>
                    <option value="Plantas Medicinales">Plantas Medicinales</option>
                </optgroup>
                    <optgroup label="Mar">
                    <option value="Crustaceos">Crustaceos</option>
                    <option value="Moluscos">Moluscos</option>
                    <option value="Equinodermos">Equinodermos</option>
                </optgroup>
            </select>
            <select id="products-per-page">
            <option value="20">Mostrar 20</option>
            <option value="40">Mostrar 40</option>
            <option value="60">Mostrar 60</option>
            </select>
        </div>
        ${filteredProducts.length===0?"<p style='text-align:center;margin-top:20px;'>Lo sentimos, no hay resultados para tu busqueda...</p>":""}
        <div class="product-grid">
        ${filteredProducts.map(p =>
        `
            <div class="product-item">
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