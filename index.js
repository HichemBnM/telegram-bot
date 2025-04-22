require('dotenv').config();
const puppeteer = require('puppeteer-core');
const TelegramBot = require('node-telegram-bot-api');

// Set up the Telegram Bot with polling
const bot = new TelegramBot(process.env.TELEGRAM_BOT_API_KEY, { polling: true });
const chatId = 'YOUR_CHAT_ID'; // You can dynamically get the chatId from any message sent to the bot
const EXECUTABLE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

// --- Function to fetch latest Instagram post ---
async function fetchInstagramPost(username) {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: EXECUTABLE_PATH,
    });

    const page = await browser.newPage();
    await page.goto(`https://www.instagram.com/${username}`);
    await page.waitForSelector('article');

    const post = await page.evaluate(() => {
        const firstPost = document.querySelector('article a');
        return firstPost ? firstPost.href : null;
    });

    await browser.close();

    return post
        ? `Here is the latest post from @${username}: ${post}`
        : `Sorry, no posts found for @${username}.`;
}


// Listen to messages from Telegram
bot.onText(/\/insta (.+)/, async (msg, match) => {
    const username = match[1];
    const chatId = msg.chat.id;

    try {
        const message = await fetchInstagramPost(username);
        bot.sendMessage(chatId, message);
    } catch (error) {
        console.error('Error fetching post:', error);
        bot.sendMessage(chatId, 'An error occurred while fetching the Instagram post.');
    }
});


// --- Listen for /profile <username> command ---
bot.onText(/\/profile (.+)/, async (msg, match) => {
    const username = match[1];
    const chatId = msg.chat.id;

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            executablePath: EXECUTABLE_PATH,
        });

        const page = await browser.newPage();
        await page.goto(`https://www.instagram.com/${username}`);
        await page.waitForSelector('header img');

        const profilePicUrl = await page.evaluate(() => {
            const imgTag = document.querySelector('header img');
            return imgTag ? imgTag.src : null;
        });

        if (profilePicUrl) {
            bot.sendPhoto(chatId, profilePicUrl);
        } else {
            bot.sendMessage(chatId, 'Could not fetch profile picture.');
        }
    } catch (err) {
        console.error(err);
        bot.sendMessage(chatId, 'An error occurred while fetching profile picture.');
    } finally {
        if (browser) await browser.close();
    }
});
// --- Help command ---
bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, `
📌 Available Commands:
/insta <username> – Get latest post
/profile <username> – Get profile picture
/help – Show this help message
    `);
});

// --- Welcome message ---
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, '👋 Welcome! Type /help to see what I can do!');
});