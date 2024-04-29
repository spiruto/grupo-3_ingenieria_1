

document.addEventListener("DOMContentLoaded", async () => {
    console.log("entro!!");
    await loadUsers();
    //await renderLayout();
    //hideLogins();
    //window.onload();

    var buttons = document.getElementsByClassName("actionButton");

    // Loop through all the buttons
    for (var i = 0; i < buttons.length; i++) {
        // Add a click event listener to each button
        buttons[i].addEventListener('click', buttonClick);
    }
});

async function loadUsers() {
    try {
        const response = await fetch('https://tienda.com/api/user');
        const users = await response.json();
        
        if (response.ok) {
            // Clear existing table rows
            document.getElementById('tableBody').innerHTML = '';

            // Populate table rows with user data
            users.forEach(user => {
                const row = document.createElement('tr');
                if (user.userType == "Cliente") {
                    row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${user.nationalId}</td>
                    <td>${user.nationalIdType}</td>
                    <td>${user.phone}</td>
                    <td>${user.userType}</td>
                    <td>N/A</td>
                    <td>${!user.active ? `<button class="activate actionButton" data-userid="${user._id}" data-action="activate">Activate</button>` : `<button class="deactivate actionButton" data-userid="${user._id}" data-action="deactivate">Deactivate</button>`}</td>
                `;
                } else {
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${user.nationalId}</td>
                    <td>${user.nationalIdType}</td>
                    <td>${user.phone}</td>
                    <td>${user.userType}</td>
                    <td>${!user.approved ? `<button class="approve actionButton" data-userid="${user._id}" data-action="approve">Approve</button>` : `<button class="reject actionButton" data-userid="${user._id}" data-action="reject">Reject</button>`}</td>
                    <td>${!user.active ? `<button class="activate actionButton" data-userid="${user._id}" data-action="activate">Activate</button>` : `<button class="deactivate actionButton" data-userid="${user._id}" data-action="deactivate">Deactivate</button>`}</td>
                `;
                }
                document.getElementById('tableBody').appendChild(row);
            });
        } else {
            console.error("Failed to fetch users:", users.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

async function buttonClick(event) {
    let userID = event.target.getAttribute("data-userid");
    let action = event.target.getAttribute("data-action");

    var url = "https://tienda.com/api/user/" + action + "/" + userID;

    const options = {
        method: 'PUT'
    };

    fetch(url, options)
    .then(()=> {
        location.reload();
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with the PUT request:', error.message);
    });
}
    