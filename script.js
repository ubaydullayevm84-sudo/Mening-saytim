document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const data = {
        name: name,
        email: email,
        message: message
    };

    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert('Your message has been sent! We will get back to you soon.');
            document.getElementById('contactForm').reset();
        } else {
            alert('An error occurred: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Could not connect to the server. Please try again later.');
    }
});
