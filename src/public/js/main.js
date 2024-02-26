// import { getComponent } from "./view-engine"

document.addEventListener("DOMContentLoaded", () => {
    alert("hola");
    const bodyEl = document.getElementById("root");
    // #region Components
    const components = {};
    // components["nav"] = getComponent("nav");
    // components["footer"] = getComponent("footer");
    // components["leftNavBar"] = getComponent("leftNavBar");
    // components["rightNavBar"] = getComponent("rightNavBar");
    // components["content"] = getComponent("content");

    let layout = "";
    Object.values(components).forEach(component => {
        layout += component;
    });
    bodyEl.innerHTML = layout;
    // #endregion
});