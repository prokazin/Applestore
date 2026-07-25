// Проверка авторизации
let isAdmin = false;
const ADMIN_PASSWORD = 'admin123';

document.getElementById('loginBtn').addEventListener('click', () => {
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        isAdmin = true;
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadAdminProducts();
    } else {
        alert('Неверный пароль!');
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    isAdmin = false;
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminPassword').value = '';
});

// Загрузка товаров в админку
function loadAdminProducts() {
    const products = JSON.parse(localStorage.getItem('appleStoreProducts') || '[]');
    const list = document.getElementById('adminProductList');
    list.innerHTML = products.map((p, index) => `
        <div class="admin-product-item" style="background:rgba(255,255,255,0.05); padding:15px; margin:10px 0; border-radius:12px;">
            <h4>${p.name} - ${p.price}</h4>
            <p>${p.description}</p>
            <button onclick="deleteProduct(${index})">Удалить</button>
            <button onclick="editProduct(${index})">Редактировать</button>
        </div>
    `).join('');
}

// Добавление товара
document.getElementById('addProductBtn').addEventListener('click', () => {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const description = document.getElementById('productDesc').value;
    const category = document.getElementById('productCategory').value;
    const images = document.getElementById('productImages').value.split(',').map(s => s.trim());
    
    // Сбор характеристик
    const specNames = document.querySelectorAll('.spec-name');
    const specValues = document.querySelectorAll('.spec-value');
    const specs = {};
    specNames.forEach((input, i) => {
        if (input.value && specValues[i].value) {
            specs[input.value] = specValues[i].value;
        }
    });
    
    if (!name || !price) {
        alert('Заполните название и цену!');
        return;
    }
    
    const products = JSON.parse(localStorage.getItem('appleStoreProducts') || '[]');
    const newProduct = {
        id: Date.now(),
        name,
        price,
        description: description || 'Описание отсутствует',
        category,
        images: images.length ? images : ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
        specs: Object.keys(specs).length ? specs : { 'Характеристика': 'Значение' }
    };
    
    products.push(newProduct);
    localStorage.setItem('appleStoreProducts', JSON.stringify(products));
    loadAdminProducts();
    
    // Очистка формы
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productDesc').value = '';
    document.getElementById('productImages').value = '';
    document.querySelectorAll('.spec-name, .spec-value').forEach(inp => inp.value = '');
    alert('Товар добавлен!');
});

// Добавление поля для характеристики
document.querySelector('.add-spec-btn').addEventListener('click', () => {
    const container = document.getElementById('specsContainer');
    const div = document.createElement('div');
    div.className = 'spec-input';
    div.innerHTML = `
        <input type="text" class="spec-name" placeholder="Название характеристики">
        <input type="text" class="spec-value" placeholder="Значение">
        <button onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(div);
});

// Удаление товара
function deleteProduct(index) {
    if (confirm('Удалить товар?')) {
        const products = JSON.parse(localStorage.getItem('appleStoreProducts') || '[]');
        products.splice(index, 1);
        localStorage.setItem('appleStoreProducts', JSON.stringify(products));
        loadAdminProducts();
    }
}

// Редактирование товара (упрощенная версия)
function editProduct(index) {
    const products = JSON.parse(localStorage.getItem('appleStoreProducts') || '[]');
    const product = products[index];
    if (!product) return;
    
    const newName = prompt('Новое название:', product.name);
    if (newName) product.name = newName;
    
    const newPrice = prompt('Новая цена:', product.price);
    if (newPrice) product.price = newPrice;
    
    const newDesc = prompt('Новое описание:', product.description);
    if (newDesc) product.description = newDesc;
    
    localStorage.setItem('appleStoreProducts', JSON.stringify(products));
    loadAdminProducts();
}
