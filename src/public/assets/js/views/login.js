import { getComponent } from "../view-engine.js"

document.addEventListener("DOMContentLoaded", () => {
    renderLayout();
});

async function renderLayout() {
    const bodyEl = document.getElementById("root");
    const components = {};
    components["nav"] = await getComponent("nav");
    components["footer"] = await getComponent("footer");
    let layout = "";
    Object.values(components).forEach(component => {
        layout += component;
    });
   // bodyEl.innerHTML = `${components.nav} ${bodyEl.innerHTML} ${components.footer}`;
}