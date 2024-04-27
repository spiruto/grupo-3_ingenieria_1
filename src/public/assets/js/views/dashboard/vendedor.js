import { getComponent } from "../../view-engine.js"

document.addEventListener("DOMContentLoaded", async () => {
    await renderLayout();
    hideLogins();
    setTimeout(() => {
        var ctx = document.getElementById('myChart').getContext('2d');
         new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Fresas', 'Manzanas', 'Naramjas', 'Brocoli', 'jocotes', 'Uvas'],
                datasets: [{
                    label: 'numero de ventas',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, 700);
});

async function renderLayout() {
    const bodyEl = document.getElementById("root");
    const components = {};
    components["nav"] = await getComponent("nav");
    components["footer"] = await getComponent("footer");

   bodyEl.innerHTML = `${components.nav} ${bodyEl.innerHTML} ${components.footer}`;
}

function hideLogins () {

    console.log("ENTRO A LA FUNCION");
    // Supongamos que tienes un objeto guardado en localStorage con la clave "miObjeto"
    var user = localStorage.getItem("user");

    var login1 = document.getElementById("cuenta-perfil");
    var login2 = document.getElementById("cuenta-perfil-logged-cliente");
    var login3 = document.getElementById("cuenta-perfil-logged-vendedor");

    // Verificar si el objeto existe en localStorage
    if (!user) {
        login2.style.display = "none";
        login3.style.display = "none";
        return;
    }
    user = JSON.parse(user);
    login1.style.display = "none";
     if (user.userType === 'Cliente') {
        login3.style.display = "none";
     } else if (user.userType === "Vendedor"){
        login2.style.display = "none";
     }
}