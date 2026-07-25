// ===== АВТОРИЗАЦИЯ =====
const ADMIN_PASSWORD = 'admin123';
let isAdmin = false;

document.getElementById('loginBtn').addEventListener('click', () => {
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        isAdmin = true;
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadAdminProducts();
    } else {
        alert('❌ Неверный пароль!');
        document.getElementById('adminPassword').value = '';
    }
});

// Вход по Enter
document.getElementById('adminPassword').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('loginBtn').click();
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    isAdmin = false;
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminPassword').value = '';
});

// ===== ЗАГРУЗКА ТОВАРОВ =====
function loadAdminProducts() {
    const products = JSON.parse(localStorage.getItem('appleStoreProducts') || '[]');
    const list = document.getElementById('adminProductList');
    
    if (products.length === 0) {
        list.innerHTML = '<p class="empty-state">📭 Нет товаров</p>';
        return;
    }
    
    list.innerHTML = products.map((p, index) => `
        <div class="admin-product-item">
            <h4>${p.name}</h4>
            <p>💰 ${p.price}</p>
            <p style="font-size:13px; color:rgba(255,255,255,0.4);">📂 ${p.category}</p>
            <div style="margin-top:8px;">
                <button onclick="deleteProduct(${index})">🗑 Удалить</button>
                <button onclick="editProduct(${index})">✏️ Редактировать</button>
            </div>
        </div>
    `).join('');
}

// ===== ДОБАВЛЕНИЕ ТОВАРА =====
document.getElementById('addProductBtn').addEventListener('click', () => {
    const name = document.getElementById('productName').value.trim();
    const price = document.getElementById('productPrice').value.trim();
    const description = document.getElementById('productDesc').value.trim();
    const category = document.getElementById('productCategory').value;
    const imagesInput = document.getElementById('productImages').value.trim();
    
    // Сбор характеристик
    const specNames = document.querySelectorAll('.spec-name');
    const specValues = document.querySelectorAll('.spec-value');
    const specs = {};
    specNames.forEach((input, i) => {
        const nameVal = input.value.trim();
        const valueVal = specValues[i]?.value.trim();
        if (nameVal && valueVal) {
            specs[nameVal] = valueVal;
        }
    });
    
    if (!name || !price) {
        alert('⚠️ Заполните название и цену!');
        return;
    }
    
    const products = JSON.parse(localStorage.getItem('appleStoreProducts') || '[]');
    const images = imagesInput ? imagesInput.split(',').map(s => s.trim()).filter(s => s) : 
        ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&fit=crop'];
    
    const newProduct = {
        id: Date.now(),
        name,
        price,
        description: description || 'Описание отсутствует',
        category,
        images: images,
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
    
    alert('✅ Товар успешно добавлен!');
});

// ===== ДОБАВЛЕНИЕ ХАРАКТЕРИСТИКИ =====
document.querySelector('.add-spec-btn').addEventListener('click', () => {
    const container = document.getElementById('specsContainer');
    const div = document.createElement('div');
    div.className = 'spec-input';
    div.innerHTML = `
        <input type="text" class="spec-name" placeholder="Название">
        <input type="text" class="spec-value" placeholder="Значение">
        <button onclick="this.parentElement.remove()" style="padding:10px 16px; background:rgba(255,59,48,0.8); border:none; border-radius:10px; color:#fff; cursor:pointer; font-size:16px;">✕</button>
    `;
    container.appendChild(div);
});

// ===== УДАЛЕНИЕ ТОВАРА =====
function deleteProduct(index) {
    if (confirm('🗑 Удалить товар?')) {
        const products = JSON.parse(localStorage.getItem('appleStoreProducts') || '[]');
        products.splice(index, 1);
        localStorage.setItem('appleStoreProducts', JSON.stringify(products));
        loadAdminProducts();
    }
}

// ===== РЕДАКТИРОВАНИЕ ТОВАРА =====
function editProduct(index) {
    const products = JSON.parse(localStorage.getItem('appleStoreProducts') || '[]');
    const product = products[index];
    if (!product) return;
    
    const newName = prompt('📝 Новое название:', product.name);
    if (newName !== null && newName.trim()) product.name = newName.trim();
    
    const newPrice = prompt('💰 Новая цена:', product.price);
    if (newPrice !== null && newPrice.trim()) product.price = newPrice.trim();
    
    const newDesc = prompt('📝 Новое описание:', product.description);
    if (newDesc !== null) product.description = newDesc.trim() || 'Описание отсутствует';
    
    localStorage.setItem('appleStoreProducts', JSON.stringify(products));
    loadAdminProducts();
    alert('✅ Товар обновлен!');
}

// ===== ЗАЩИТА ОТ ЗУМА =====
document.addEventListener('gesturestart', (e) => e.preventDefault());
document.addEventListener('gesturechange', (e) => e.preventDefault());
