// ===== ДАННЫЕ =====
let products = [];
let cart = [];
let currentCategory = 'watch';
let cartComment = '';
let loadingInterval;

// ===== КОНФИГУРАЦИЯ =====
const APP_URL = 'https://applestore.nazar-bronnikov22.workers.dev/';

const TELEGRAM_CONFIG = {
    botToken: '8763062943:AAET57GuStuIhmnDCO2BD9w5v3cMp3FGtes',
    chatId: '8380652624'
};

// ===== ЗАГРУЗОЧНЫЙ ЭКРАН =====
function showLoadingScreen() {
    const screen = document.getElementById('loadingScreen');
    const progress = document.getElementById('loadingProgress');
    let width = 0;
    
    loadingInterval = setInterval(() => {
        width += Math.random() * 3 + 1;
        if (width >= 100) {
            width = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                screen.classList.add('hidden');
                setTimeout(() => {
                    screen.style.display = 'none';
                }, 500);
            }, 300);
        }
        progress.style.width = width + '%';
    }, 50);
}

// ===== ЗАГРУЗКА ДАННЫХ =====
function loadData() {
    const saved = localStorage.getItem('appleStoreProducts');
    if (saved) {
        products = JSON.parse(saved);
    } else {
        products = [
            // ===== APPLE WATCH =====
            {
                id: 4,
                name: 'Apple Watch Ultra 2',
                price: '79900',
                description: 'Самые прочные умные часы для экстремальных условий. Титан, 49 мм, дисплей 3000 нит',
                category: 'watch',
                images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop'],
                specs: { 'Экран': '49mm', 'Процессор': 'S9', 'GPS': 'Точный', 'Защита': 'WR100' }
            },
            {
                id: 5,
                name: 'Apple Watch Series 9',
                price: '39900',
                description: 'Умные часы с сенсором температуры и функцией ЭКГ',
                category: 'watch',
                images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop'],
                specs: { 'Экран': '45mm', 'Процессор': 'S9', 'Пульс': 'Да', 'ЭКГ': 'Да' }
            },
            {
                id: 6,
                name: 'Apple Watch SE',
                price: '24900',
                description: 'Доступные умные часы с фитнес-трекингом и GPS',
                category: 'watch',
                images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop'],
                specs: { 'Экран': '44mm', 'Процессор': 'S8', 'GPS': 'Да', 'Водозащита': '50m' }
            },
            // ===== IPHONE =====
            {
                id: 1,
                name: 'iPhone 15 Pro Max',
                price: '129990',
                description: 'Флагманский смартфон с титановым корпусом, Dynamic Island и чипом A17 Pro',
                category: 'iphone',
                images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop'],
                specs: { 'Экран': '6.7" OLED', 'Процессор': 'A17 Pro', 'Камера': '48 МП', 'Память': '256 ГБ' }
            },
            {
                id: 2,
                name: 'iPhone 15 Pro',
                price: '99990',
                description: 'Смартфон с титановым корпусом и Dynamic Island',
                category: 'iphone',
                images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop'],
                specs: { 'Экран': '6.1" OLED', 'Процессор': 'A17 Pro', 'Камера': '48 МП', 'Память': '128 ГБ' }
            },
            {
                id: 3,
                name: 'iPhone 15',
                price: '79990',
                description: 'Смартфон с Dynamic Island и USB-C',
                category: 'iphone',
                images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop'],
                specs: { 'Экран': '6.1" OLED', 'Процессор': 'A16', 'Камера': '48 МП', 'Память': '128 ГБ' }
            },
            // ===== MAC =====
            {
                id: 7,
                name: 'MacBook Pro 16" M3 Max',
                price: '299990',
                description: 'Профессиональный ноутбук для самых сложных задач',
                category: 'mac',
                images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop'],
                specs: { 'Экран': '16" XDR', 'Процессор': 'M3 Max', 'Память': '36 ГБ', 'SSD': '1 ТБ' }
            },
            {
                id: 8,
                name: 'MacBook Pro 14" M3 Pro',
                price: '199990',
                description: 'Профессиональный ноутбук для работы и творчества',
                category: 'mac',
                images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop'],
                specs: { 'Экран': '14" XDR', 'Процессор': 'M3 Pro', 'Память': '18 ГБ', 'SSD': '512 ГБ' }
            },
            {
                id: 9,
                name: 'MacBook Air 15" M2',
                price: '119990',
                description: 'Самый тонкий ноутбук с большим экраном',
                category: 'mac',
                images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop'],
                specs: { 'Экран': '15.3" Retina', 'Процессор': 'M2', 'Память': '8 ГБ', 'SSD': '256 ГБ' }
            },
            // ===== AIRPODS =====
            {
                id: 10,
                name: 'AirPods Pro 2 USB-C',
                price: '24990',
                description: 'Наушники с активным шумоподавлением и чипом H2',
                category: 'airpods',
                images: ['https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop'],
                specs: { 'Чип': 'H2', 'Время': '6 ч', 'Зарядка': 'USB-C', 'Защита': 'IPX4' }
            },
            {
                id: 11,
                name: 'AirPods Max',
                price: '54990',
                description: 'Полноразмерные наушники премиум-класса с Hi-Fi звуком',
                category: 'airpods',
                images: ['https://images.unsplash.com/photo-1611859266238-a4da980d66d9?w=400&h=400&fit=crop'],
                specs: { 'Чип': 'H1', 'Время': '20 ч', 'Зарядка': 'USB-C', 'Вес': '385 г' }
            },
            {
                id: 12,
                name: 'AirPods 3',
                price: '17990',
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
    }, 3000);
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
function renderProducts(category = 'watch') {
    const catalog = document.getElementById('catalog');
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);

    if (filtered.length === 0) {
        catalog.innerHTML = `<div style="text-align:center;padding:30px 0;color:rgba(255,255,255,0.15);font-size:13px;">📭 Нет товаров в этой категории</div>`;
        return;
    }

    catalog.innerHTML = filtered.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy" decoding="async">
            <h3>${product.name}</h3>
            <div class="price">${formatPrice(product.price)}</div>
            <div class="category-tag">${product.category}</div>
        </div>
    `).join('');

    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.04}s`;
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            openModal(id);
        });
    });
}

// ===== ФОРМАТИРОВАНИЕ ЦЕНЫ =====
function formatPrice(price) {
    const num = parseInt(price);
    if (isNaN(num)) return price;
    return num.toLocaleString('ru-RU') + ' ₽';
}

// ===== ОТКРЫТИЕ МОДАЛЬНОГО ОКНА ТОВАРА =====
function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalPrice').textContent = formatPrice(product.price);
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
    
    const savedComment = localStorage.getItem('cartComment') || '';
    document.getElementById('cartComment').value = savedComment;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <span class="empty-icon">🛒</span>
                Корзина пуста
            </div>
        `;
        document.getElementById('cartTotal').textContent = '0 ₽';
    } else {
        container.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">${formatPrice(item.price)}</span>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">✕</button>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => {
            const price = parseInt(item.price);
            return sum + (isNaN(price) ? 0 : price);
        }, 0);
        document.getElementById('cartTotal').textContent = formatPrice(total.toString());
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

// ===== СОХРАНЕНИЕ КОММЕНТАРИЯ =====
document.getElementById('cartComment').addEventListener('input', function() {
    cartComment = this.value;
    localStorage.setItem('cartComment', cartComment);
});

// ===== ОФОРМЛЕНИЕ ЗАКАЗА =====
function checkout() {
    if (cart.length === 0) {
        showNotification('⚠️ Корзина пуста', 'error');
        return;
    }
    
    cartComment = document.getElementById('cartComment').value;
    localStorage.setItem('cartComment', cartComment);
    
    document.getElementById('cartModal').style.display = 'none';
    openPaymentModal();
}

// ===== ОТКРЫТИЕ ОПЛАТЫ =====
function openPaymentModal() {
    const modal = document.getElementById('paymentModal');
    const total = cart.reduce((sum, item) => {
        const price = parseInt(item.price);
        return sum + (isNaN(price) ? 0 : price);
    }, 0);
    
    document.getElementById('paymentDetails').innerHTML = `
        <p>🛍️ Товаров: <strong>${cart.length}</strong></p>
        <p>💰 Сумма: <strong>${formatPrice(total.toString())}</strong></p>
        <p style="font-size:11px;color:rgba(255,255,255,0.15);margin-top:6px;">
            ${cart.map(item => `• ${item.name}`).join('<br>')}
        </p>
        ${cartComment ? `<p style="font-size:11px;color:rgba(255,255,255,0.15);margin-top:4px;">📝 Комментарий: ${cartComment}</p>` : ''}
    `;
    
    document.getElementById('cardNumber').value = '';
    document.getElementById('cardExpiry').value = '';
    document.getElementById('cardCvc').value = '';
    document.getElementById('cardName').value = '';
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// ===== ФОРМАТИРОВАНИЕ НОМЕРА КАРТЫ =====
document.getElementById('cardNumber').addEventListener('input', function(e) {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    let formatted = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += value[i];
    }
    this.value = formatted;
});

document.getElementById('cardExpiry').addEventListener('input', function(e) {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
        this.value = value.slice(0, 2) + '/' + value.slice(2);
    } else {
        this.value = value;
    }
});

document.getElementById('cardCvc').addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '').slice(0, 3);
});

// ===== ПРОВЕРКА КАРТЫ =====
function validateCard(number, expiry, cvc, name) {
    const errors = [];
    
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.length !== 16) errors.push('Номер карты должен содержать 16 цифр');
    if (!/^\d{16}$/.test(cleanNumber)) errors.push('Номер карты содержит недопустимые символы');
    
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        errors.push('Формат срока: MM/YY');
    } else {
        const [month, year] = expiry.split('/');
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        if (parseInt(month) < 1 || parseInt(month) > 12) errors.push('Неверный месяц');
        if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            errors.push('Карта просрочена');
        }
    }
    
    if (!/^\d{3}$/.test(cvc)) errors.push('CVC должен содержать 3 цифры');
    if (name.length < 2) errors.push('Введите имя владельца');
    
    return errors;
}

// ===== ПОДТВЕРЖДЕНИЕ ОПЛАТЫ =====
document.getElementById('confirmPaymentBtn').addEventListener('click', async function() {
    const cardNumber = document.getElementById('cardNumber').value;
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCvc = document.getElementById('cardCvc').value;
    const cardName = document.getElementById('cardName').value;
    
    const btn = this;
    btn.textContent = '⏳ Проверка...';
    btn.disabled = true;
    
    const errors = validateCard(cardNumber, cardExpiry, cardCvc, cardName);
    if (errors.length > 0) {
        btn.textContent = '❌ Ошибка';
        btn.classList.add('error');
        showNotification('⚠️ ' + errors[0], 'error');
        setTimeout(() => {
            btn.textContent = '✅ Оплатить';
            btn.classList.remove('error');
            btn.disabled = false;
        }, 2000);
        return;
    }
    
    const total = cart.reduce((sum, item) => {
        const price = parseInt(item.price);
        return sum + (isNaN(price) ? 0 : price);
    }, 0);
    
    try {
        btn.textContent = '⏳ Обработка...';
        
        const response = await fetch(`${APP_URL}create-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: total,
                currency: 'RUB',
                description: `Заказ в Apple Store (${cart.length} товаров)`,
                items: cart.map(item => item.name).join(', ')
            })
        });
        
        const paymentData = await response.json();
        
        if (paymentData.error) {
            throw new Error(paymentData.error);
        }
        
        const checkout = new YooKassaCheckoutWidget({
            confirmation_token: paymentData.confirmation_token,
            return_url: APP_URL,
            error_callback: function(error) {
                console.error('Ошибка оплаты:', error);
                showNotification('❌ Ошибка оплаты. Попробуйте снова', 'error');
                btn.textContent = '✅ Оплатить';
                btn.classList.add('error');
                btn.disabled = false;
                setTimeout(() => btn.classList.remove('error'), 3000);
            }
        });
        
        checkout.on('success', function() {
            btn.textContent = '✅ Успешно!';
            btn.classList.add('success');
            
            const orderDetails = cart.map(item => `• ${item.name} - ${formatPrice(item.price)}`).join('\n');
            const message = `
🛍️ <b>НОВЫЙ ЗАКАЗ ОПЛАЧЕН!</b>

📦 <b>Товары:</b>
${orderDetails}

💰 <b>Итого:</b> ${formatPrice(total.toString())}
💳 <b>Оплата:</b> Карта (YooKassa)

👤 <b>Клиент:</b> Telegram Mini App
✅ <b>Статус:</b> ОПЛАЧЕНО
${cartComment ? `\n📝 <b>Комментарий:</b> ${cartComment}` : ''}
            `.trim();
            
            sendTelegramMessage(message);
            showNotification('🎉 Оплата прошла успешно!', 'success');
            
            cart = [];
            saveCart();
            updateCartBadge();
            cartComment = '';
            localStorage.setItem('cartComment', '');
            
            setTimeout(() => {
                btn.textContent = '✅ Оплатить';
                btn.classList.remove('success');
                btn.disabled = false;
                document.getElementById('paymentModal').style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 3000);
        });
        
        checkout.on('fail', function() {
            showNotification('❌ Оплата не прошла. Попробуйте снова', 'error');
            btn.textContent = '✅ Оплатить';
            btn.classList.add('error');
            btn.disabled = false;
            setTimeout(() => btn.classList.remove('error'), 3000);
        });
        
        checkout.render();
        
    } catch (error) {
        console.error('Ошибка:', error);
        showNotification('❌ Ошибка оплаты: ' + error.message, 'error');
        btn.textContent = '✅ Оплатить';
        btn.classList.add('error');
        btn.disabled = false;
        setTimeout(() => btn.classList.remove('error'), 3000);
    }
});

// ===== ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН =====
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

// ===== ОБНОВЛЕНИЕ ВРЕМЕНИ В ОСТРОВКЕ =====
function updateIslandTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('islandTime').textContent = `${hours}:${minutes}`;
}

updateIslandTime();
setInterval(updateIslandTime, 60000);

// ===== ТАЙМЕР АКЦИИ =====
function startPromoTimer() {
    let hours = 12, minutes = 34, seconds = 56;
    
    setInterval(() => {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
                minutes = 59;
                hours--;
                if (hours < 0) {
                    hours = 0;
                    minutes = 0;
                    seconds = 0;
                }
            }
        }
        
        document.getElementById('timerHours').textContent = String(hours).padStart(2, '0');
        document.getElementById('timerMinutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('timerSeconds').textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

// ===== НАВИГАЦИЯ =====
document.querySelectorAll('.tab-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.tab-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        renderProducts(item.dataset.category);
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
showLoadingScreen();
loadData();
startPromoTimer();

setTimeout(() => {
    renderProducts('watch');
}, 500);

console.log('🍎 Apple Store Mini App готов!');
console.log(`📦 Товаров: ${products.length}`);
console.log(`🛒 В корзине: ${cart.length}`);
console.log(`🔗 URL: ${APP_URL}`);
