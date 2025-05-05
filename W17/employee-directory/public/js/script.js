window.onload = function() {
     fetch('/api/employees')
         .then(response => response.json())
         .then(data => {
             const employeeList = document.getElementById('employee-list');
             data.forEach(employee => {
                 const card = document.createElement('div');
                 card.classList.add('employee-card');
 
                 card.innerHTML = `
                     <img src="${employee.profile_image}" alt="${employee.name}">
                     <h3>${employee.name}</h3>
                     <p><strong>Designation:</strong> ${employee.designation}</p>
                     <p><strong>Department:</strong> ${employee.department}</p>
                     <p><strong>Salary:</strong> ${employee.salary}</p>
                 `;
 
                 employeeList.appendChild(card);
             });
         })
         .catch(err => console.error('Error fetching employee data:', err));
 };
 