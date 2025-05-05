const products = [
     {
       image: 'https://via.placeholder.com/80?text=Headphones',
       name: 'Wireless Headphones',
       price: '₹7,999',
       desc: 'Noise-cancelling over-ear headphones.'
     },
     {
       image: 'https://via.placeholder.com/80?text=Smartwatch',
       name: 'Smartwatch',
       price: '₹12,999',
       desc: 'Fitness tracking smartwatch.'
     },
     {
       image: 'https://via.placeholder.com/80?text=Mouse',
       name: 'Gaming Mouse',
       price: '₹2,499',
       desc: 'Ergonomic gaming mouse.'
     },
     {
       image: 'https://via.placeholder.com/80?text=Stand',
       name: 'Laptop Stand',
       price: '₹1,999',
       desc: 'Adjustable aluminium stand.'
     },
     // Add more dummy products to test pagination
   ];
   
   for (let i = 0; i < 20; i++) {
     products.push({
       image: `https://via.placeholder.com/80?text=Item${i+5}`,
       name: `Product ${i+5}`,
       price: `₹${(i+5)*100}`,
       desc: `Description for product ${i+5}`
     });
   }
   
   let currentPage = 1;
   const itemsPerPage = 10;
   
   function displayProducts() {
     const tbody = document.getElementById('productBody');
     tbody.innerHTML = '';
   
     const start = (currentPage - 1) * itemsPerPage;
     const end = Math.min(start + itemsPerPage, products.length);
     const pageItems = products.slice(start, end);
   
     for (let product of pageItems) {
       const row = `<tr>
         <td><img src="${product.image}" alt="${product.name}"></td>
         <td>${product.name}</td>
         <td>${product.price}</td>
         <td>${product.desc}</td>
       </tr>`;
       tbody.innerHTML += row;
     }
   
     document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${Math.ceil(products.length / itemsPerPage)}`;
   }
   
   function prevPage() {
     if (currentPage > 1) {
       currentPage--;
       displayProducts();
     }
   }
   
   function nextPage() {
     if (currentPage < Math.ceil(products.length / itemsPerPage)) {
       currentPage++;
       displayProducts();
     }
   }
   
   displayProducts();
   