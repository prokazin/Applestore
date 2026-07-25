// webhook.js
export default {
    async fetch(request, env) {
        const data = await request.json();
        
        if (data.message) {
            const chatId = data.message.chat.id;
            const text = data.message.text;
            
            // Обработка команд
            if (text === '/start') {
                await sendMessage(chatId, 'Добро пожаловать! Используйте кнопку "Открыть магазин"');
            } else if (text === '/cart') {
                await sendMessage(chatId, 'Откройте магазин и добавьте товары в корзину');
            }
        }
        
        return new Response('OK');
    }
};

async function sendMessage(chatId, text) {
    const token = '8763062943:AAET57GuStuIhmnDCO2BD9w5v3cMp3FGtes';
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text })
    });
}
