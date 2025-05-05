function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const message = document.getElementById('message');

  if (!name || !email || !phone || !password || !confirmPassword) {
    message.textContent = "All fields are required.";
    return false;
  }

  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    message.textContent = "Phone number must be 10 digits.";
    return false;
  }

  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
    return false;
  }

  if (password.length < 6) {
    message.textContent = "Password must be at least 6 characters long.";
    return false;
  }

  const userData = { name, email, phone };
  localStorage.setItem('user', JSON.stringify(userData));

  window.location.href = 'display.html';
  return false;
}