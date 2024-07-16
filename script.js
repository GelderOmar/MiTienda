document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');
    const productList = document.getElementById('product-list');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        const image = document.getElementById('product-image').value;

        const product = { name, price, image };
        
        await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        document.getElementById('product-name').value = '';
        document.getElementById('product-price').value = '';
        document.getElementById('product-image').value = '';

        loadProducts();
    });

    async function loadProducts() {
        productList.innerHTML = '';
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button class="delete-btn" data-id="${product.id}">&times;</button>
            `;

            productCard.querySelector('.delete-btn').addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                await fetch(`http://localhost:3000/products/${id}`, {
                    method: 'DELETE'
                });
                loadProducts();
            });

            productList.appendChild(productCard);
        });
    }

    loadProducts();
});
