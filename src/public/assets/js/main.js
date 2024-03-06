import { getComponent } from "./view-engine.js"

document.addEventListener("DOMContentLoaded", () => {
    renderLayout();
});

async function renderLayout() {
    const bodyEl = document.getElementById("root");
    const components = {};
    components["nav"] = await getComponent("nav");
    components["leftNavBar"] = await getComponent("leftNavBar");
    components["rightNavBar"] = await getComponent("rightNavBar");
    components["content"] = await getComponent("content");
    components["footer"] = await getComponent("footer");
    let layout = "";
    Object.values(components).forEach(component => {
        layout += component;
    });
    bodyEl.innerHTML = layout;
}