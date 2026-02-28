// Language Translation Logic
let currentLang = localStorage.getItem('lang') || 'uz';

function updateUI() {
    const isEn = currentLang === 'en';
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.textContent = isEn ? 'O\'zbekcha' : 'English';
    }
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-uz]').forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) el.innerHTML = text;
    });

    document.querySelectorAll('[data-uz-placeholder]').forEach(el => {
        const placeholder = el.getAttribute(`data-${currentLang}-placeholder`);
        if (placeholder) el.placeholder = placeholder;
    });
}

function toggleLanguage() {
    currentLang = currentLang === 'uz' ? 'en' : 'uz';
    localStorage.setItem('lang', currentLang);
    updateUI();
}

// Initialize UI
updateUI();

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const contactHandle = document.getElementById('contact_handle').value;
        const message = document.getElementById('message').value;

        const token = '8558684655:AAGdGuoHWxN_74_NJzIY5WrqryknFa3uGSM';
        const chatId = '6156910611';

        // Translatable labels for Telegram message
        const labels = {
            uz: { title: 'Yangi xabar!', name: 'Ism', email: 'Email', contact: 'Aloqa', msg: 'Xabar', empty: 'Xabar yoʻq', success: 'Xabaringiz yuborildi! Tez orada javob beramiz.', error: 'Xatolik yuz berdi:', connError: 'Telegramga bogʻlanib boʻlmadi. Internetni tekshiring.' },
            en: { title: 'New message!', name: 'Name', email: 'Email', contact: 'Contact', msg: 'Message', empty: 'No message', success: 'Your message has been sent! We will reply soon.', error: 'An error occurred:', connError: 'Could not connect to Telegram. Check your internet.' }
        };

        const l = labels[currentLang];

        // Formatting contact info for Telegram
        let contactInfo = contactHandle || 'Belgilanmagan';
        if (contactHandle.startsWith('@')) {
            const username = contactHandle.substring(1);
            contactInfo = `<a href="https://t.me/${username}">${contactHandle}</a>`;
        }

        const text = `<b>📩 ${l.title}</b>\n\n` +
            `<b>👤 ${l.name}:</b> ${name}\n` +
            `<b>📧 ${l.email}:</b> <a href="mailto:${email}">${email}</a>\n` +
            `<b>📞 ${l.contact}:</b> ${contactInfo}\n` +
            `<b>📝 ${l.msg}:</b> ${message || l.empty}`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text,
                    parse_mode: 'HTML'
                })
            });

            const result = await response.json();

            if (result.ok) {
                alert(l.success);
                document.getElementById('contactForm').reset();
            } else {
                alert(`${l.error} ${result.description}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(l.connError);
        }
    });
}
