import { getComponent } from "../view-engine.js";
import validateForm from "../formValidator.js";

document.addEventListener("DOMContentLoaded", () => {
  renderLayout();
});

const validationRules = {
  numeroTarjeta[validations.required, value => value.length == 16 || "Debe tener 16 números"
  ],
  nombreTarjeta[validations.required],
  vencimientoTarjeta[validations.required],
  cvc[validations.required, value => value.length == 3 ||"Debe tener 3 números"]
};

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

  validateForm("validacionTarjetaCredito", validationRules);
}
