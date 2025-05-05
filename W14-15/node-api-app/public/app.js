window.onload = function() {
     // Fetch data from the API
     fetch('/api/users')
       .then(response => response.json())
       .then(data => {
         const userList = document.getElementById('user-list');
         
         // Loop through the user data and create list items
         data.forEach(user => {
           const li = document.createElement('li');
           li.innerHTML = `<strong>${user.name}</strong><br>${user.email}`;
           userList.appendChild(li);
         });
       })
       .catch(error => {
         console.error('Error fetching user data:', error);
       });
   };
   