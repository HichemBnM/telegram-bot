require('dotenv').config();
const puppeteer = require('puppeteer-core');
const TelegramBot = require('node-telegram-bot-api');

// Set up the Telegram Bot with polling
const bot = new TelegramBot(process.env.TELEGRAM_BOT_API_KEY, { polling: true });
const chatId = 'YOUR_CHAT_ID'; // You can dynamically get the chatId from any message sent to the bot

async function fetchInstagramPost(username) {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', // Path to Microsoft Edge
    });

    const page = await browser.newPage();
    await page.goto(`https://www.instagram.com/${username}`);
    await page.waitForSelector('article'); // Wait for posts to load

    const post = await page.evaluate(() => {
        const firstPost = document.querySelector('article a');
        return firstPost ? firstPost.href : null; // Extract the link to the first post
    });

    if (post) {
        console.log(`Latest post URL: ${post}`);
        return `Here is the latest post from @${username}: ${post}`;
    } else {
        console.error('No posts found for this username.');
        return `Sorry, no posts found for @${username}.`;
    }

    await browser.close();
}

// Listen to messages from Telegram
bot.onText(/\/insta (.+)/, async (msg, match) => {
    const username = match[1]; // Get the Instagram username from the command
    const chatId = msg.chat.id; // Get the chatId dynamically from the message

    try {
        const postMessage = await fetchInstagramPost(username);
        bot.sendMessage(chatId, postMessage); // Send the post URL to the chat
    } catch (error) {
        console.error('Error fetching post:', error);
        bot.sendMessage(chatId, 'An error occurred while fetching the Instagram post.');
    }
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // Send a welcome message or instruction
    if (msg.text === '/start') {
        bot.sendMessage(chatId, 'Welcome! To fetch the latest Instagram post, send the command `/insta <username>`');
    }
});
