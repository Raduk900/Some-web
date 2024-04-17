document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('idHome').addEventListener('click', function() {
    fetch('http://localhost:8080/test-endpoint', {
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

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('signin').addEventListener('click', function () {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    if(username===""){
      return alert("Input username");
    }
    else if(password===""){
      return alert("Input password");
    }
    
    fetch('http://localhost:8080/user-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({ message: 'User sent from frontend',
                              username: username,
                              password: password})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log('Response from the backend:', data))
    .catch(error => console.error('Error:', error));
  })
});

function myMenuFunction() {
  var i = document.getElementById("navMenu");

  if (i.className === "nav-menu") {
    i.className += " responsive";
  } else {
    i.className = "nav-menu";
  }
}

function login() {
  var a = document.getElementById("loginBtn");
  var b = document.getElementById("registerBtn");
  var x = document.getElementById("login");
  var y = document.getElementById("register");

  x.style.left = "4px";
  y.style.right = "-520px";
  a.className += " white-btn";
  b.className = "btn";
  x.style.opacity = 1;
  y.style.opacity = 0;
}

function register() {
  var a = document.getElementById("loginBtn");
  var b = document.getElementById("registerBtn");
  var x = document.getElementById("login");
  var y = document.getElementById("register");

  x.style.left = "-510px";
  y.style.right = "5px";
  a.className = "btn";
  b.className += " white-btn";
  x.style.opacity = 0;
  y.style.opacity = 1;
} 
