// Инициализация данных
let products = [];
let cart = [];

// Загрузка данных из localStorage
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
                description: 'Флагманский смартфон с титановым корпусом',
                category: 'iphone',
                images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400', 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400'],
                specs: { 'Экран': '6.1" OLED', 'Процессор': 'A17 Pro', 'Камера': '48 МП', 'Память': '256 ГБ' }
            },
            {
                id: 2,
                name: 'iPhone 15',
                price: '799$',
                description: 'Смартфон с Dynamic Island',
                category: 'iphone',
                images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400'],
                specs: { 'Экран': '6.1" OLED', 'Процессор': 'A16', 'Камера': '48 МП', 'Память': '128 ГБ' }
            },
            {
                id: 3,
                name: 'iPhone SE',
                price: '429$',
                description: 'Компактный смартфон с Touch ID',
                category: 'iphone',
                images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'],
                specs: { 'Экран': '4.7" LCD', 'Процессор': 'A15', 'Камера': '12 МП', 'Память': '64 ГБ' }
            },
            {
                id: 4,
                name: 'iPad Pro',
                price: '1099$',
                description: 'Профессиональный планшет с M2',
                category: 'ipad',
                images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'],
                specs: { 'Экран': '12.9" Liquid Retina', 'Процессор': 'M2', 'Камера': '12 МП', 'Память': '256 ГБ' }
            },
            {
                id: 5,
                name: 'iPad Air',
                price: '599$',
                description: 'Легкий планшет с M1',
                category: 'ipad',
                images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'],
                specs: { 'Экран': '10.9" Liquid Retina', 'Процессор': 'M1', 'Камера': '12 МП', 'Память': '64 ГБ' }
            },
            {
                id: 6,
                name: 'iPad Mini',
                price: '499$',
                description: 'Компактный планшет для игр',
                category: 'ipad',
                images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'],
                specs: { 'Экран': '8.3" Liquid Retina', 'Процессор': 'A15', 'Камера': '12 МП', 'Память': '64 ГБ' }
            },
            {
                id: 7,
                name: 'MacBook Pro 14',
                price: '1999$',
                description: 'Ноутбук для профессионалов',
                category: 'mac',
                images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
                specs: { 'Экран': '14" Liquid Retina XDR', 'Процессор': 'M3 Pro', 'Память': '18 ГБ', 'SSD': '512 ГБ' }
            },
            {
                id: 8,
                name: 'MacBook Air',
                price: '1099$',
                description: 'Самый тонкий ноутбук',
                category: 'mac',
                images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
                specs: { 'Экран': '13.6" Liquid Retina', 'Процессор': 'M2', 'Память': '8 ГБ', 'SSD': '256 ГБ' }
            },
            {
                id: 9,
                name: 'iMac 24',
                price: '1299$',
                description: 'Моноблок с M3',
                category: 'mac',
                images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400'],
                specs: { 'Экран': '24" 4.5K', 'Процессор': 'M3', 'Память': '8 ГБ', 'SSD': '256 ГБ' }
            },
            {
                id: 10,
                name: 'AirPods Pro 2',
                price: '249$',
                description: 'Наушники с шумоподавлением',
                category: 'airpods',
                images: ['https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400'],
                specs: { 'Чип': 'H2', 'Время работы': '6 ч', 'Зарядка': 'USB-C', 'Водозащита': 'IPX4' }
            },
            {
                id: 11,
                name: 'AirPods Max',
                price: '549$',
                description: 'Полноразмерные наушники',
                category: 'airpods',
                images: ['https://images.unsplash.com/photo-1611859266238-a4da980d66d9?w=400'],
                specs: { 'Чип': 'H1', 'Время работы': '20 ч', 'Зарядка': 'Lightning', 'Вес': '385 г' }
            },
            {
                id: 12,
                name: 'AirPods 3',
                price: '179$',
                description: 'Беспроводные наушники',
                category: 'airpods',
                images: ['https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400'],
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

// Сохранение данных
function saveData() {
    localStorage.setItem('appleStoreProducts', JSON.stringify(products));
}

// Обновление корзины
function updateCartBadge() {
    document.getElementById('cartBadge').textContent = cart.length;
}

// Отображение товаров
function renderProducts(category = 'all') {
    const catalog = document.getElementById('catalog');
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    
    catalog.innerHTML = filtered.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
            <h3>${product.name}</h3>
            <div class="price">${product.price}</div>
        </div>
    `).join('');
    
    // Добавляем обработчики на карточки
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            openModal(id);
        });
    });
}

// Открытие модального окна
function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalPrice').textContent = product.price;
    document.getElementById('modalDescription').textContent = product.description;
    
    // Карусель
    const carousel = document.getElementById('modalCarousel');
    carousel.innerHTML = product.images.map(img => `<img src="${img}" alt="${product.name}">`).join('');
    
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
        alert(`Товар "${product.name}" добавлен в корзину!`);
        
        // Здесь можно реализовать отправку продавцу через Telegram Bot API
        // Пример: sendOrderToSeller(product);
    };
    
    modal.style.display = 'block';
}

// Закрытие модального окна
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('productModal').style.display = 'none';
});

// Клик вне модального окна
window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('productModal')) {
        document.getElementById('productModal').style.display = 'none';
    }
});

// Фильтрация по категориям
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.category);
    });
});

// Навигация по иконкам
document.querySelectorAll('.nav-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const category = icon.dataset.category;
        document.querySelectorAll('.cat-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        renderProducts(category);
    });
});

// Инициализация
loadData();
renderProducts();
