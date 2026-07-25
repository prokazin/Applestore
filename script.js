// ===== ДАННЫЕ =====
let products = [];
let cart = [];
let currentCategory = 'all';

// ===== ЗАГРУЗКА ДАННЫХ =====
function loadData() {
    const saved = localStorage.getItem('appleStoreProducts');
    if (saved) {
        products = JSON.parse(saved);
    } else {
        // Начальные товары (по 3 в каждой категории)
        products = [
            {
                id: 1,
                name: 'iPhone 15 Pro',
                price: '999$',
                description: 'Флагманский смартфон с титановым корпусом, Dynamic Island и чипом A17 Pro',
                category: 'iphone',
                images: [
                    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&fit=crop',
                    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&fit=crop'
                ],
                specs: { 'Экран': '6.1" OLED', 'Процессор': 'A17 Pro', 'Камера': '48 МП', 'Память': '256 ГБ' }
            },
            {
                id: 2,
                name: 'iPhone 15',
                price: '799$',
                description: 'Смартфон с Dynamic Island, USB-C и чипом A16',
                category: 'iphone',
                images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&fit=crop'],
                specs: { 'Экран': '6.1" OLED', 'Процессор': 'A16', 'Камера': '48 МП', 'Память': '128 ГБ' }
            },
            {
                id: 3,
                name: 'iPhone SE',
                price: '429$',
                description: 'Компактный смартфон с Touch ID и чипом A15',
                category: 'iphone',
                images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&fit=crop'],
                specs: { 'Экран': '4.7" LCD', 'Процессор': 'A15', 'Камера': '12 МП', 'Память': '64 ГБ' }
            },
            {
                id: 4,
                name: 'iPad Pro',
                price: '1099$',
                description: 'Профессиональный планшет с чипом M2 и дисплеем Liquid Retina XDR',
                category: 'ipad',
                images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&fit=crop'],
                specs: { 'Экран': '12.9" Liquid Retina', 'Процессор': 'M2', 'Камера': '12 МП', 'Память': '256 ГБ' }
            },
            {
                id: 5,
                name: 'iPad Air',
                price: '599$',
                description: 'Легкий планшет с чипом M1 и дисплеем Liquid Retina',
                category: 'ipad',
                images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&fit=crop'],
                specs: { 'Экран': '10.9" Liquid Retina', 'Процессор': 'M1', 'Камера': '12 МП', 'Память': '64 ГБ' }
            },
            {
                id: 6,
                name: 'iPad Mini',
                price: '499$',
                description: 'Компактный планшет для игр и чтения с чипом A15',
                category: 'ipad',
                images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&fit=crop'],
                specs: { 'Экран': '8.3" Liquid Retina', 'Процессор': 'A15', 'Камера': '12 МП', 'Память': '64 ГБ' }
            },
            {
                id: 7,
                name: 'MacBook Pro 14',
                price: '1999$',
                description: 'Профессиональный ноутбук с чипом M3 Pro и дисплеем Liquid Retina XDR',
                category: 'mac',
                images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&fit=crop'],
                specs: { 'Экран': '14" Liquid Retina XDR', 'Процессор': 'M3 Pro', 'Память': '18 ГБ', 'SSD': '512 ГБ' }
            },
            {
                id: 8,
                name: 'MacBook Air',
                price: '1099$',
                description: 'Самый тонкий ноутбук с чипом M2 и дисплеем Liquid Retina',
                category: 'mac',
                images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&fit=crop'],
                specs: { 'Экран': '13.6" Liquid Retina', 'Процессор': 'M2', 'Память': '8 ГБ', 'SSD': '256 ГБ' }
            },
            {
                id: 9,
                name: 'iMac 24',
                price: '1299$',
                description: 'Моноблок с чипом M3 и 4.5K дисплеем в семи цветах',
                category: 'mac',
                images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&fit=crop'],
                specs: { 'Экран': '24" 4.5K', 'Процессор': 'M3', 'Память': '8 ГБ', 'SSD': '256 ГБ' }
            },
            {
                id: 10,
                name: 'AirPods Pro 2',
                price: '249$',
                description: 'Наушники с активным шумоподавлением, чипом H2 и USB-C',
                category: 'airpods',
                images: ['https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&fit=crop'],
                specs: { 'Чип': 'H2', 'Время работы': '6 ч', 'Зарядка': 'USB-C', 'Водозащита': 'IPX4' }
            },
            {
                id: 11,
                name: 'AirPods Max',
                price: '549$',
                description: 'Полноразмерные наушники премиум-класса с чипом H1',
                category: 'airpods',
                images: ['https://images.unsplash.com/photo-1611859266238-a4da980d66d9?w=500&fit=crop'],
                specs: { 'Чип': 'H1', 'Время работы': '20 ч', 'Зарядка': 'Lightning', 'Вес': '385 г' }
            },
            {
                id: 12,
                name: 'AirPods 3',
                price: '179$',
                description: 'Беспроводные наушники с пространственным аудио и чипом H1',
                category: 'airpods',
                images: ['https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&fit=crop'],
                specs: { 'Чип': 'H1', 'Время работы': '6 ч', 'Зарядка': 'Lightning', 'Пространственное аудио': 'Да' }
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

// ===== ОБНОВЛЕНИЕ КОРЗИНЫ =====
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    badge.textContent = cart.length;
    badge.style.transform = cart.length > 0 ? 'scale(1.1)' : 'scale(1)';
}

// ===== ОТОБРАЖЕНИЕ ТОВАРОВ =====
function renderProducts(category = 'all') {
    const catalog = document.getElementById('catalog');
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);

    if (filtered.length === 0) {
        catalog.innerHTML = `
            <div class="empty-state">
                <p>📭 Нет товаров в этой категории</p>
            </div>
        `;
        return;
    }

    catalog.innerHTML = filtered.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy" decoding="async">
            <h3>${product.name}</h3>
            <div class="price">${product.price}</div>
        </div>
    `).join('');

    // Обработчики на карточки
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            openModal(id);
        });
    });
}

// ===== ОТКРЫТИЕ МОДАЛЬНОГО ОКНА =====
function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalPrice').textContent = product.price;
    document.getElementById('modalDescription').textContent = product.description;

    // Карусель
    const carousel = document.getElementById('modalCarousel');
    carousel.innerHTML = product.images.map(img => `
        <img src="${img}" alt="${product.name}" loading="lazy" decoding="async">
    `).join('');

    // Характеристики
    const specsDiv = document.getElementById('modalSpecs');
    specsDiv.innerHTML = Object.entries(product.specs).map(([key, value]) => `
        <div class="spec-item">
            <span>${key}</span>
            <span>${value}</span>
        </div>
    `).join('');

    // Кнопка покупки
    document.getElementById('modalBuyBtn').onclick = () => {
        cart.push(product);
        localStorage.setItem('appleStoreCart', JSON.stringify(cart));
        updateCartBadge();
        
        // Анимация уведомления
        const btn = document.getElementById('modalBuyBtn');
        btn.textContent = '✅ В корзине!';
        btn.style.background = 'linear-gradient(135deg, #34c759, #28a745)';
        setTimeout(() => {
            btn.textContent = 'Купить';
            btn.style.background = 'linear-gradient(135deg, #7c3aed, #6d28d9)';
        }, 2000);
        
        // Отправка продавцу
        sendOrderToSeller(product);
    };

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// ===== ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА =====
document.querySelector('.close-modal').addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('productModal')) {
        closeModal();
    }
});

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ===== ОТПРАВКА ЗАКАЗА ПРОДАВЦУ =====
function sendOrderToSeller(product) {
    // Вставьте свои данные для Telegram Bot
    const botToken = 'YOUR_BOT_TOKEN'; // Замените на ваш токен
    const chatId = 'SELLER_CHAT_ID'; // Замените на ID чата продавца
    
    if (botToken === 'YOUR_BOT_TOKEN') {
        console.log('📦 Заказ:', product.name, product.price);
        return;
    }
    
    const message = `🛍️ НОВЫЙ ЗАКАЗ!\n\n📱 Товар: ${product.name}\n💰 Цена: ${product.price}\n📝 Описание: ${product.description}`;
    
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('✅ Заказ отправлен продавцу');
        } else {
            console.error('❌ Ошибка отправки:', data);
        }
    })
    .catch(error => console.error('❌ Ошибка:', error));
}

// ===== НАВИГАЦИЯ =====
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const category = item.dataset.category;
        currentCategory = category;
        renderProducts(category);
    });
});

// ===== ЗАЩИТА ОТ ЗУМА =====
document.addEventListener('gesturestart', (e) => e.preventDefault());
document.addEventListener('gesturechange', (e) => e.preventDefault());

// ===== ИНИЦИАЛИЗАЦИЯ =====
loadData();
renderProducts('all');
