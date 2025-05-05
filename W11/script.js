// Function to switch to Registration Form
function showRegisterForm() {
     document.getElementById('login-form-container').style.display = 'none';
     document.getElementById('registration-form-container').style.display = 'block';
     document.getElementById('register-error').innerHTML = '';
     document.getElementById('login-error').innerHTML = '';
   }
   
   // Function to switch to Login Form
   function showLoginForm() {
     document.getElementById('login-form-container').style.display = 'block';
     document.getElementById('registration-form-container').style.display = 'none';
     document.getElementById('register-error').innerHTML = '';
     document.getElementById('login-error').innerHTML = '';
   }
   
   // Validate Login Form
   document.getElementById('login-form').addEventListener('submit', function(event) {
     event.preventDefault();
     
     let username = document.getElementById('login-username').value;
     let password = document.getElementById('login-password').value;
     let users = JSON.parse(localStorage.getItem('users')) || [];
     
     let user = users.find(u => u.username === username && u.password === password);
     
     if (user) {
       alert("Login Successful!");
       window.location.href = 'user-list.html'; // Redirect to the User List page
     } else {
       document.getElementById('login-error').innerHTML = 'Invalid Username or Password';
     }
   });
   
   // Validate Registration Form
   document.getElementById('registration-form').addEventListener('submit', function(event) {
     event.preventDefault();
     
     // Get form values
     let name = document.getElementById('name').value;
     let email = document.getElementById('email').value;
     let mobile = document.getElementById('mobile').value;
     let dob = document.getElementById('dob').value;
     let city = document.getElementById('city').value;
     let address = document.getElementById('address').value;
     let password = document.getElementById('password').value;
     let confirmPassword = document.getElementById('confirm-password').value;
   
     // Validate form
     if (!name || !email || !mobile || !dob || !city || !address || !password || !confirmPassword) {
       document.getElementById('register-error').innerHTML = 'All fields are required!';
       return;
     }
     
     if (!validateEmail(email)) {
       document.getElementById('register-error').innerHTML = 'Invalid email address!';
       return;
     }
     
     if (!validateMobile(mobile)) {
       document.getElementById('register-error').innerHTML = 'Invalid mobile number!';
       return;
     }
   
     if (password !== confirmPassword) {
       document.getElementById('register-error').innerHTML = 'Passwords do not match!';
       return;
     }
   
     // Create user object
     let user = {
       name,
       email,
       mobile,
       dob,
       city,
       address,
       username: email,  // Using email as username for simplicity
       password  // Using the password entered by the user
     };
     
     // Save to localStorage
     let users = JSON.parse(localStorage.getItem('users')) || [];
     users.push(user);
     localStorage.setItem('users', JSON.stringify(users));
   
     alert('Registration Successful!');
     showLoginForm(); // Switch to login form after registration
   });
   
   // Validate email format
   function validateEmail(email) {
     const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
     return re.test(email);
   }
   
   // Validate mobile number (10 digits)
   function validateMobile(mobile) {
     const re = /^[0-9]{10}$/;
     return re.test(mobile);
   }
   