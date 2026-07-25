// ===== АВТОРИЗАЦИЯ =====
const ADMIN_PASSWORD = 'admin123';

document.getElementById('loginBtn').addEventListener('click', () => {
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadAdminProducts();
        showNotification('✅ Добро пожаловать в админ-панель!', 'success');
    } else {
        showNotification('❌ Неверный пароль!', 'error');
        document.getElementById('adminPassword').value = '';
    }
});

document.getElementById('adminPassword').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('loginBtn').click();
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminPassword').value = '';
    showNotification('👋 Вы вышли из админ-панели');
});

// ===== УВЕДОМЛЕНИЯ =====
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.textContent = message;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.opacity = '0';
        notif.style.transform = 'translateX(-50%) translateY(-10px)';
        setTimeout(() => notif.remove(), 300);
    }, 2500);
}

// ===== ЗАГРУЗКА ТОВАРОВ =====
function loadAdminProducts() {
    const products = JSON.parse(localStorage.getItem('appleStoreProducts') || '[]');
    const list = document.getElementById('adminProductList');
    
    if (products.length === 0) {
        list.innerHTML = '<p style="text-align:center;color:rgba(255,255,255,0.3);padding:20px;">📭 Нет товаров</p>';
        return;
    }
    
    list.innerHTML = products.map((p, index) => `
        <div class="admin-product-item">
            <div>
                <h4>${p.name}</h4>
                <p>💰 ${p.price} | 📂 ${p.category}</p>
            </div>
            <div>
                <button onclick="deleteProduct(${index})">🗑</button>
                <button onclick="editProduct(${index})">✏️</button>
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
        showNotification('⚠️ Заполните название и цену!', 'error');
        return;
    }
    
    const products = JSON.parse(localStorage.getItem('appleStoreProducts') || '[]');
    const images = imagesInput ? imagesInput.split(',').map(s => s.trim()).filter(s => s) : 
        ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop'];
    
    products.push({
        id: Date.now(),
        name,
        price,
        description: description || 'Описание отсутствует',
        category,
        images: images,
        specs: Object.keys(specs).length ? specs : { 'Характеристика': 'Значение' }
    });
    
    localStorage.setItem('appleStoreProducts', JSON.stringify(products));
    loadAdminProducts();
    
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productDesc').value = '';
    document.getElementById('productImages').value = '';
    document.querySelectorAll('.spec-name, .spec-value').forEach(inp => inp.value = '');
    
    showNotification('✅ Товар добавлен!', 'success');
});

// ===== ДОБАВЛЕНИЕ ХАРАКТЕРИСТИКИ =====
document.querySelector('.add-spec-btn').addEventListener('click', () => {
    const container = document.getElementById('specsContainer');
    const div = document.createElement('div');
    div.className = 'spec-input';
    div.innerHTML = `
        <input type="text" class="spec-name" placeholder="Название">
        <input type="text" class="spec-value" placeholder="Значение">
        <button onclick="this.parentElement.remove()" style="padding:6px 12px;background:rgba(255,59,48,0.6);border:none;border-radius:8px;color:#fff;cursor:pointer;">✕</button>
    `;
    container.appendChild(div);
});

// ===== УДАЛЕНИЕ =====
function deleteProduct(index) {
    if (confirm('🗑 Удалить товар?')) {
        const products = JSON.parse(localStorage.getItem('appleStoreProducts') || '[]');
        products.splice(index, 1);
        localStorage.setItem('appleStoreProducts', JSON.stringify(products));
        loadAdminProducts();
        showNotification('🗑 Товар удален');
    }
}

// ===== РЕДАКТИРОВАНИЕ =====
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
    showNotification('✅ Товар обновлен!', 'success');
}

// ===== ЗАЩИТА ОТ ЗУМА =====
document.addEventListener('gesturestart', (e) => e.preventDefault());
document.addEventListener('gesturechange', (e) => e.preventDefault());

console.log('🔐 Админ-панель загружена');
