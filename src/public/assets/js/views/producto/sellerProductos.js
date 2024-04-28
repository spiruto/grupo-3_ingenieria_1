document.addEventListener("DOMContentLoaded", async () => {
    await loadProducts();
    var buttons = document.getElementsByClassName("fas");

    // Loop through all the buttons
    for (var i = 0; i < buttons.length; i++) {
        // Add a click event listener to each button
        buttons[i].addEventListener('click', buttonClick);
    }
});

async function loadProducts() {
    try {
        var user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch('https://tienda.com/api/inventory/seller/' + user._id); 
        const inventories = await response.json();
        
        if (response.ok) {
            // Clear existing table rows
            document.getElementById('tableBody').innerHTML = '';

            // Populate table rows with user data
            inventories.forEach(inventory => {
                const row = document.createElement('tr');
    
                row.innerHTML = `
                <td>${inventory.product.name}</td>
                <td><img src="${inventory.product.imageUrl}" width="250" height="150"></img></td>
                <td>${inventory.product.category}</td>
                <td>${inventory.product.price}</td>
                <td>${inventory.quantity}</td>
                <td><button class="fas" inventory-id="${inventory._id}">Edit</button></td>
                `;
                document.getElementById('tableBody').appendChild(row);
            });
        } else {
            console.error("Failed to fetch products:", inventory.parameter);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

async function buttonClick(event) {
    let invID = event.target.getAttribute("inventory-id");

    var url = "https://tienda.com/api/inventory/" + invID; 

    fetch(url)
    .then((response)=> {
        return response.json();
    })
    .then(data => {
        localStorage.setItem("inventory", JSON.stringify(data));
        window.location.href = 'https://tienda.com/producto/editar';
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with the PUT request:', error.message);
    });
}
    