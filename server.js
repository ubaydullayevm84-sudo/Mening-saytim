require('dotenv').config();
const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Telegram Bot initialization
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const bot = new TelegramBot(token, { polling: false });

// Routes
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    const text = `
📩 New Contact Form Message!
👤 Name: ${name}
📧 Email: ${email}
📝 Message: ${message || 'No message'}
    `;

    try {
        await bot.sendMessage(chatId, text);
        console.log('Message sent to Telegram');
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        res.status(500).json({ success: false, message: 'An error occurred while sending the message.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
