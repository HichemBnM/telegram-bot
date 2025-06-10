# Instagram-Telegram Bot 🤖

A Telegram bot that allows users to fetch Instagram profile information and latest posts directly through Telegram commands.

## Features ✨

- Fetch latest Instagram posts from any public profile
- Get Instagram profile pictures
- Simple and intuitive command interface
- Real-time updates through Telegram

## Prerequisites 📋

- Node.js (v12 or higher)
- Microsoft Edge browser installed
- Telegram Bot Token (from [@BotFather](https://t.me/botfather))
- Instagram account (for accessing public profiles)

## Installation 🚀

1. Clone the repository:
```bash
git clone https://github.com/yourusername/instagram-telegram-bot.git
cd instagram-telegram-bot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Telegram Bot API key:
```
TELEGRAM_BOT_API_KEY=your_bot_token_here
```

## Configuration ⚙️

Make sure to update the following in your `index.js`:

1. Replace `YOUR_CHAT_ID` with your Telegram chat ID
2. Verify the Edge browser path in `EXECUTABLE_PATH` matches your system:
```javascript
const EXECUTABLE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
```

## Usage 💡

Start the bot:
```bash
node index.js
```

### Available Commands

- `/start` - Welcome message
- `/help` - Display available commands
- `/insta <username>` - Get the latest post from an Instagram profile
- `/profile <username>` - Get the profile picture of an Instagram user

Example:
```
/insta instagram
/profile instagram
```

## Technologies Used 🛠

- Node.js
- node-telegram-bot-api
- Puppeteer-core
- Microsoft Edge WebDriver

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📝

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer ⚠️

This bot is for educational purposes only. Please respect Instagram's terms of service and rate limits when using this bot. 
