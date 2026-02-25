document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const token = '8558684655:AAGdGuoHWxN_74_NJzIY5WrqryknFa3uGSM';
    const chatId = '6156910611';
    const text = `📩 Yangi xabar!\n👤 Ism: ${name}\n📧 Email: ${email}\n📝 Xabar: ${message || 'Xabar yoʻq'}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text
            })
        });

        const result = await response.json();

        if (result.ok) {
            alert('Xabaringiz yuborildi! Tez orada javob beramiz.');
            document.getElementById('contactForm').reset();
        } else {
            alert('Xatolik yuz berdi: ' + result.description);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Telegramga bogʻlanib boʻlmadi. Internetni tekshiring.');
    }
});
