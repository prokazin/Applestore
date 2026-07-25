// ===== ДАННЫЕ =====
let products = [];
let cart = [];
let currentCategory = 'all';
let selectedPaymentMethod = 'card';

// ===== КОНФИГУРАЦИЯ TELEGRAM =====
const TELEGRAM_CONFIG = {
    botToken: '8763062943:AAET57GuStuIhmnDCO2BD9w5v3cMp3FGtes',
    chatId: '8380652624'
};

// ===== ЗАГРУЗКА ДАННЫХ =====
function loadData() {
    const saved = localStorage.getItem('appleStoreProducts');
    if (saved) {
        products = JSON.parse(saved);
    } else {
        products = [
            // iPhone (3 товара)
            {
                id: 1,
                name: 'iPhone 15 Pro',
                price: '999$',
                description: 'Флагманский смартфон с титановым корпусом и Dynamic Island',
                category: 'iphone',
                images: [
                    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop'
                ],
                specs: { 'Экран': '6.1" OLED', 'Процессор': 'A17 Pro', 'Камера': '48 МП', 'Память': '256 ГБ' }
            },
            {
                id: 2,
                name: 'iPhone 15',
                price: '799$',
                description: 'Смартфон с Dynamic Island и USB-C',
                category: 'iphone',
                images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop'],
                specs: { 'Экран': '6.1" OLED', 'Процессор': 'A16', 'Камера': '48 МП', 'Память': '128 ГБ' }
            },
            {
                id: 3,
                name: 'iPhone SE',
                price: '429$',
                description: 'Компактный смартфон с Touch ID',
                category: 'iphone',
                images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop'],
                specs: { 'Экран': '4.7" LCD', 'Процессор': 'A15', 'Камера': '12 МП', 'Память': '64 ГБ' }
            },
            // Apple Watch (3 товара)
            {
                id: 4,
                name: 'Apple Watch Ultra 2',
                price: '799$',
                description: 'Самые прочные умные часы для экстремальных условий',
                category: 'watch',
                images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop'],
                specs: { 'Экран': '49mm', 'Процессор': 'S9', 'GPS': 'Точный', 'Защита': 'WR100' }
            },
            {
                id: 5,
                name: 'Apple Watch Series 9',
                price: '399$',
                description: 'Умные часы с сенсором температуры',
                category: 'watch',
                images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop'],
                specs: { 'Экран': '45mm', 'Процессор': 'S9', 'Пульс': 'Да', 'ЭКГ': 'Да' }
            },
            {
                id: 6,
                name: 'Apple Watch SE',
                price: '249$',
                description: 'Доступные умные часы с фитнес-трекингом',
                category: 'watch',
                images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop'],
                specs: { 'Экран': '44mm', 'Процессор': 'S8', 'GPS': 'Да', 'Водозащита': '50m' }
            },
            // Mac (3 товара)
            {
                id: 7,
                name: 'MacBook Pro 14',
                price: '1999$',
                description: 'Профессиональный ноутбук с M3 Pro',
                category: 'mac',
                images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop'],
                specs: { 'Экран': '14" XDR', 'Процессор': 'M3 Pro', 'Память': '18 ГБ', 'SSD': '512 ГБ' }
            },
            {
                id: 8,
                name: 'MacBook Air',
                price: '1099$',
                description: 'Самый тонкий ноутбук с M2',
                category: 'mac',
                images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop'],
                specs: { 'Экран': '13.6" Retina', 'Процессор': 'M2', 'Память': '8 ГБ', 'SSD': '256 ГБ' }
            },
            {
                id: 9,
                name: 'iMac 24',
                price: '1299$',
                description: 'Моноблок с M3 и 4.5K дисплеем',
                category: 'mac',
                images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop'],
                specs: { 'Экран': '24" 4.5K', 'Процессор': 'M3', 'Память': '8 ГБ', 'SSD': '256 ГБ' }
            },
            // AirPods (3 товара)
            {
                id: 10,
                name: 'AirPods Pro 2',
                price: '249$',
                description: 'Наушники с активным шумоподавлением',
                category: 'airpods',
                images: ['https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop'],
                specs: { 'Чип': 'H2', 'Время': '6 ч', 'Зарядка': 'USB-C', 'Защита': 'IPX4' }
            },
            {
                id: 11,
                name: 'AirPods Max',
                price: '549$',
                description: 'Полноразмерные наушники премиум-класса',
                category: 'airpods',
                images: ['https://images.unsplash.com/photo-1611859266238-a4da980d66d9?w=400&h=400&fit=crop'],
                specs: { 'Чип': 'H1', 'Время': '20 ч', 'Зарядка': 'Lightning', 'Вес': '385 г' }
            },
            {
                id: 12,
                name: 'AirPods 3',
                price: '179$',
                description: 'Беспроводные наушники с пространственным аудио',
                category: 'airpods',
                images: ['https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop'],
                specs: { 'Чип': 'H1', 'Время': '6 ч', 'Зарядка': 'Lightning', 'Аудио': 'Пространственное' }
            }
        ];
        saveData();
    }

    const savedCart = localStorage.getItem('appleStoreCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartBadge();
}

// ===== СОХРАНЕНИЕ =====
function saveData() {
    localStorage.setItem('appleStoreProducts', JSON.stringify(products));
}

function saveCart() {
    localStorage.setItem('appleStoreCart', JSON.stringify(cart));
}

// ===== ОБНОВЛЕНИЕ КОРЗИНЫ =====
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    badge.textContent = cart.length;
    if (cart.length > 0) {
        badge.classList.add('pulse');
        setTimeout(() => badge.classList.remove('pulse'), 300);
    }
}

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

// ===== ОТПРАВКА В TELEGRAM =====
function sendTelegramMessage(message) {
    return fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: TELEGRAM_CONFIG.chatId,
            text: message,
            parse_mode: 'HTML'
        })
    })
    .then(res => res.json())
    .catch(error => {
        console.error('Ошибка отправки в Telegram:', error);
        return { ok: false };
    });
}

// ===== ОТОБРАЖЕНИЕ ТОВАРОВ =====
function renderProducts(category = 'all') {
    const catalog = document.getElementById('catalog');
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);

    if (filtered.length === 0) {
        catalog.innerHTML = `<div style="text-align:center;padding:20px;color:rgba(255,255,255,0.3);font-size:13px;">📭 Нет товаров</div>`;
        return;
    }

    catalog.innerHTML = filtered.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy" decoding="async">
            <h3>${product.name}</h3>
            <div class="price">${product.price}</div>
            <div class="category-tag">${product.category}</div>
        </div>
    `).join('');

    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            openModal(id);
        });
    });
}

// ===== ОТКРЫТИЕ МОДАЛЬНОГО ОКНА ТОВАРА =====
function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalPrice').textContent = product.price;
    document.getElementById('modalDescription').textContent = product.description;

    const carousel = document.getElementById('modalCarousel');
    carousel.innerHTML = product.images.map(img => `
        <img src="${img}" alt="${product.name}" loading="lazy" decoding="async">
    `).join('');

    const specsDiv = document.getElementById('modalSpecs');
    specsDiv.innerHTML = Object.entries(product.specs).map(([key, value]) => `
        <div class="spec-item">
            <span>${key}</span>
            <span>${value}</span>
        </div>
    `).join('');

    const buyBtn = document.getElementById('modalBuyBtn');
    buyBtn.onclick = () => {
        addToCart(product);
        buyBtn.textContent = '✅ В корзине!';
        buyBtn.classList.add('added');
        setTimeout(() => {
            buyBtn.textContent = '🛒 Добавить в корзину';
            buyBtn.classList.remove('added');
        }, 1500);
    };

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// ===== ДОБАВЛЕНИЕ В КОРЗИНУ =====
function addToCart(product) {
    cart.push(product);
    saveCart();
    updateCartBadge();
    showNotification(`✅ ${product.name} добавлен в корзину`, 'success');
}

// ===== ОТКРЫТИЕ КОРЗИНЫ =====
function openCart() {
    const modal = document.getElementById('cartModal');
    const container = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-cart">🛒 Корзина пуста</div>';
        document.getElementById('cartTotal').textContent = '0$';
    } else {
        container.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">${item.price}</span>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">✕</button>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return sum + price;
        }, 0);
        document.getElementById('cartTotal').textContent = `${total.toFixed(0)}$`;
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// ===== УДАЛЕНИЕ ИЗ КОРЗИНЫ =====
function removeFromCart(index) {
    const removed = cart[index];
    cart.splice(index, 1);
    saveCart();
    updateCartBadge();
    openCart();
    showNotification(`🗑 ${removed.name} удален из корзины`);
}

// ===== ОЧИСТКА КОРЗИНЫ =====
function clearCart() {
    if (cart.length === 0) return;
    if (confirm('Очистить корзину?')) {
        cart = [];
        saveCart();
        updateCartBadge();
        openCart();
        showNotification('🗑 Корзина очищена');
    }
}

// ===== ОФОРМЛЕНИЕ ЗАКАЗА =====
function checkout() {
    if (cart.length === 0) {
        showNotification('⚠️ Корзина пуста', 'error');
        return;
    }
    
    document.getElementById('cartModal').style.display = 'none';
    openPaymentModal();
}

// ===== ОТКРЫТИЕ ОПЛАТЫ =====
function openPaymentModal() {
    const modal = document.getElementById('paymentModal');
    const total = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return sum + price;
    }, 0);
    
    document.getElementById('paymentDetails').innerHTML = `
        <p>🛍️ Товаров: <strong>${cart.length}</strong></p>
        <p>💰 Сумма: <strong>${total.toFixed(0)}$</strong></p>
        <p style="font-size:12px;color:rgba(255,255,255,0.3);margin-top:8px;">
            ${cart.map(item => `• ${item.name}`).join('<br>')}
        </p>
    `;
    
    document.querySelectorAll('.payment-method').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.method === selectedPaymentMethod) {
            btn.classList.add('active');
        }
    });
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// ===== ВЫБОР МЕТОДА ОПЛАТЫ =====
document.querySelectorAll('.payment-method').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.payment-method').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedPaymentMethod = btn.dataset.method;
    });
});

// ===== ПОДТВЕРЖДЕНИЕ ОПЛАТЫ =====
document.getElementById('confirmPaymentBtn').addEventListener('click', () => {
    const btn = document.getElementById('confirmPaymentBtn');
    btn.textContent = '⏳ Обработка...';
    btn.disabled = true;
    
    const total = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return sum + price;
    }, 0);
    
    const orderDetails = cart.map(item => `• ${item.name} - ${item.price}`).join('\n');
    const message = `
🛍️ <b>НОВЫЙ ЗАКАЗ!</b>

📦 <b>Товары:</b>
${orderDetails}

💰 <b>Итого:</b> ${total.toFixed(0)}$
💳 <b>Оплата:</b> ${selectedPaymentMethod}

👤 <b>Клиент:</b> Telegram Mini App
    `.trim();
    
    sendTelegramMessage(message).then(result => {
        if (result.ok) {
            btn.textContent = '✅ Успешно!';
            btn.classList.add('success');
            showNotification('🎉 Заказ успешно оформлен!', 'success');
            
            cart = [];
            saveCart();
            updateCartBadge();
            
            setTimeout(() => {
                btn.textContent = '✅ Подтвердить оплату';
                btn.classList.remove('success');
                btn.disabled = false;
                document.getElementById('paymentModal').style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 2000);
        } else {
            btn.textContent = '❌ Ошибка';
            setTimeout(() => {
                btn.textContent = '✅ Подтвердить оплату';
                btn.disabled = false;
            }, 2000);
            showNotification('❌ Ошибка оплаты', 'error');
        }
    });
});

// ===== ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН =====
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

document.getElementById('closeCart').addEventListener('click', () => {
    document.getElementById('cartModal').style.display = 'none';
    document.body.style.overflow = 'auto';
});

document.getElementById('closePayment').addEventListener('click', () => {
    document.getElementById('paymentModal').style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ===== НАВИГАЦИЯ =====
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        renderProducts(item.dataset.category);
        
        document.querySelector('.catalog').style.animation = 'none';
        setTimeout(() => {
            document.querySelector('.catalog').style.animation = 'fadeSlideUp 0.3s ease';
        }, 10);
    });
});

// ===== СОБЫТИЯ КОРЗИНЫ =====
document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('checkoutBtn').addEventListener('click', checkout);
document.getElementById('clearCartBtn').addEventListener('click', clearCart);

// ===== ЗАЩИТА ОТ ЗУМА =====
document.addEventListener('gesturestart', (e) => e.preventDefault());
document.addEventListener('gesturechange', (e) => e.preventDefault());

// ===== ИНИЦИАЛИЗАЦИЯ =====
loadData();
renderProducts('all');

console.log('🍎 Apple Store Mini App готов!');
console.log(`📦 Товаров: ${products.length}`);
console.log(`🛒 В корзине: ${cart.length}`);
