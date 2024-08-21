document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // Define the correct email and password for the owner
    const ownerEmail = 'owner@gmail.com'; // Replace with actual owner's email
    const ownerPassword = 'password'; // Replace with actual owner's password

    // Perform basic client-side validation
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    // Handle login logic based on role
    if (role === 'owner') {
        if (email === ownerEmail && password === ownerPassword) {
            window.location.href = 'admin.html'; 
        } else {
            alert('Invalid email or password for owner.');
        }
    } else if (role === 'customer') {
        window.location.href = 'customer.html';
    }
});

