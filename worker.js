// ===== CLOUDFLARE WORKER ДЛЯ ОБРАБОТКИ ПЛАТЕЖЕЙ =====
// Этот файл нужно загрузить в Cloudflare Workers

// Конфигурация YooKassa
const YOOKASSA_CONFIG = {
    shopId: 'YOUR_SHOP_ID', // Замените на ваш Shop ID
    secretKey: 'YOUR_SECRET_KEY', // Замените на ваш секретный ключ
    returnUrl: 'https://applestore.nazar-bronnikov22.workers.dev/'
};

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname;

        // CORS для всех запросов
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers });
        }

        // Создание платежа
        if (path === '/create-payment' && request.method === 'POST') {
            try {
                const body = await request.json();
                const { amount, currency, description, items } = body;

                // Создаем платеж в YooKassa
                const paymentData = {
                    amount: {
                        value: amount.toString(),
                        currency: currency || 'RUB'
                    },
                    capture: true,
                    confirmation: {
                        type: 'redirect',
                        return_url: YOOKASSA_CONFIG.returnUrl
                    },
                    description: description || 'Заказ в Apple Store',
                    metadata: {
                        items: items || '',
                        order_id: Date.now().toString()
                    }
                };

                // Отправляем запрос в YooKassa
                const auth = btoa(`${YOOKASSA_CONFIG.shopId}:${YOOKASSA_CONFIG.secretKey}`);
                const response = await fetch('https://api.yookassa.ru/v3/payments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${auth}`,
                        'Idempotence-Key': Date.now().toString()
                    },
                    body: JSON.stringify(paymentData)
                });

                const result = await response.json();

                if (result.error) {
                    return new Response(JSON.stringify({ 
                        error: result.error.description || 'Ошибка создания платежа' 
                    }), { 
                        status: 400,
                        headers: { ...headers, 'Content-Type': 'application/json' }
                    });
                }

                return new Response(JSON.stringify({
                    confirmation_token: result.confirmation.confirmation_token,
                    payment_id: result.id,
                    confirmation_url: result.confirmation.confirmation_url
                }), {
                    status: 200,
                    headers: { ...headers, 'Content-Type': 'application/json' }
                });

            } catch (error) {
                console.error('Payment error:', error);
                return new Response(JSON.stringify({ 
                    error: 'Внутренняя ошибка сервера' 
                }), {
                    status: 500,
                    headers: { ...headers, 'Content-Type': 'application/json' }
                });
            }
        }

        // Проверка статуса платежа
        if (path === '/check-payment' && request.method === 'GET') {
            const paymentId = url.searchParams.get('paymentId');
            
            if (!paymentId) {
                return new Response(JSON.stringify({ error: 'Payment ID required' }), {
                    status: 400,
                    headers: { ...headers, 'Content-Type': 'application/json' }
                });
            }

            try {
                const auth = btoa(`${YOOKASSA_CONFIG.shopId}:${YOOKASSA_CONFIG.secretKey}`);
                const response = await fetch(`https://api.yookassa.ru/v3/payments/${paymentId}`, {
                    headers: {
                        'Authorization': `Basic ${auth}`
                    }
                });

                const result = await response.json();

                return new Response(JSON.stringify({
                    status: result.status,
                    paid: result.status === 'succeeded',
                    amount: result.amount
                }), {
                    status: 200,
                    headers: { ...headers, 'Content-Type': 'application/json' }
                });

            } catch (error) {
                return new Response(JSON.stringify({ error: 'Ошибка проверки' }), {
                    status: 500,
                    headers: { ...headers, 'Content-Type': 'application/json' }
                });
            }
        }

        // Корневой путь
        if (path === '/' || path === '/index.html') {
            return fetch('https://applestore.nazar-bronnikov22.workers.dev/index.html');
        }

        return new Response('Not Found', { status: 404, headers });
    }
};
