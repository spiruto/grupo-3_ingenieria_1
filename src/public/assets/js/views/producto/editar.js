// Autor => Daniel Quesada Arias

import { getComponent } from "../../view-engine.js"
import validations from "../../validations.js"
import validateForm from "../../formValidator.js";

const validationRules = {
    nombre: [validations.required],
    nombreVariante: [validations.required],
    precio: [validations.required],
    imagenVariante: [validations.required],
    existencia: [validations.required],
    descripcion: [validations.required],
    imagen: [validations.required],
};
let variante = 2;
document.addEventListener("DOMContentLoaded", async () => {
    await renderLayout();
    hideLogins ();
    setTimeout(() => {
        document.getElementById("btn-add-variation").addEventListener("click", () => {
            document.getElementById("variants").innerHTML += `
            <tr>
            <td><input class="variant-check" type="checkbox" /></td>
            <td><input name="nombreVariante${variante}" type="text" placeholder="Nombre de variante"/></td>
            <td><input name="precio${variante}" type="number" min="1" placeholder="Precio"/></td>
            <td><input name="imagenVariante${variante}" type="file" /></td>
            <td><input name="existencia${variante}" type="number" placeholder="Existencia"/></td>
        </tr>`;
            validationRules[`nombreVariante${variante}`] = [validations.required];
            validationRules[`precio${variante}`] = [validations.required];
            validationRules[`imagenVariante${variante}`] = [validations.required];
            validationRules[`existencia${variante}`] = [validations.required];
            variante++;
        });
        document.getElementById("variants-check-all").addEventListener("change", (e) => {
            const checked = e.target.checked;
            selectAll(checked);
        });
        document.getElementById("btn-remove-selected").addEventListener("click", (e) => {
            removeSelected();
        });
    }, 100);
});

async function renderLayout() {
    const bodyEl = document.getElementById("root");
    const components = {};
    components["nav"] = await getComponent("nav");
    components["footer"] = await getComponent("footer");

    bodyEl.innerHTML = `${components.nav} ${bodyEl.innerHTML} ${components.footer}`;
    validateForm("form", validationRules);
}

function selectAll(checked) {
    document.querySelectorAll("input[type='checkbox'][class='variant-check']").forEach(el => {
        el.checked = checked;
    })
}

function removeSelected() {
    const toDelete = [...document.getElementById("variants").rows];
    for (const row of toDelete) {
        if (row.cells[0].childNodes[0].checked) {
            const index = row.cells[1].childNodes[0].name.split("nombreVariante")[1];
            delete validationRules[`nombreVariante${index}`]
            delete validationRules[`precio${index}`]
            delete validationRules[`imagenVariante${index}`]
            delete validationRules[`existencia${index}`]
            row.remove();
        }
    }
}

function hideLogins () {

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
     } else if (user.userType === "Vendedor"){
        login2.style.display = "none";
     } else if (user.userType === "admin"){
      login2.style.display = "none";
      login3.style.display = "none";
     }
    }

  
  