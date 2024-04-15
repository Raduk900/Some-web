document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('myButton').addEventListener('click', function() {
        fetch('http://localhost:8080/test-endpoint', {  // Update the URL to include the port number
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: 'Hello from the frontend!' })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => console.log('Response from the backend:', data))
        .catch(error => console.error('Error:', error));
    });
});
