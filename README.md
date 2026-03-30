# 🤖 Multi-Bot Manager — Discord

A lightweight Node.js utility for logging in and managing **multiple Discord bots simultaneously** from a single script. Designed to handle staggered logins to stay under Discord's rate limits, with clean console reporting for each bot's status.

---

## ✨ Features

- 🔑 **Multi-Token Support** — Load and launch any number of bots from a single `token.txt` file
- ⏱️ **Staggered Login System** — Randomized delay (5–15s) between each login to avoid Discord API rate limiting
- 📋 **Live Console Reporting** — Tracks each bot's online status, index, and tag in real time
- ❌ **Error Isolation** — If one token fails, the rest continue launching unaffected
- ⚡ **Minimal Footprint** — No database, no config files, no web dashboard — just run and go

---

## 🛠️ Tech Stack

| Library | Purpose |
|---|---|
| `discord.js` v14 | Discord API client |
| `Node.js` | Runtime |
| `fs` (built-in) | Reading the token file |

---

## 📋 Prerequisites

- **Node.js** v18 or higher
- One or more valid Discord Bot Tokens from the [Discord Developer Portal](https://discord.com/developers/applications)

---

## ⚙️ Installation

**1. Clone the repository**
```bash
git clone https://github.com/antivirus786/multi-bot-manager.git
cd multi-bot-manager
```

**2. Install dependencies**
```bash
npm install discord.js
```

**3. Add your tokens**

Create a `token.txt` file in the root directory and add one bot token per line:

```
YOUR_FIRST_BOT_TOKEN
YOUR_SECOND_BOT_TOKEN
YOUR_THIRD_BOT_TOKEN
```

> ⚠️ **Never commit `token.txt` to GitHub.** Add it to your `.gitignore` immediately (see below).

**4. Run the manager**
```bash
node index.js
```

---

## 📟 Example Output

```
--- Multi-Bot Manager Loaded ---
Found 3 tokens. Starting deployment...
[1/3] Online: RhythmBot#1234
Waiting 8.3s before next login...
[2/3] Online: HelperBot#5678
Waiting 12.1s before next login...
[3/3] Online: ModBot#9012
```

---

## 🗂️ Project Structure

```
multi-bot-manager/
├── index.js        # Main launcher — reads tokens and starts all bots
├── token.txt       # Your bot tokens (one per line) — DO NOT COMMIT THIS
├── .gitignore      # Should include token.txt
└── README.md
```

---

## 🔧 Customization

**Change the activity/status of each bot:**

Uncomment and edit this line inside `index.js`:

```js
client.user.setActivity('Your Status Here', { type: 2 }); // Type 2 = Listening
```

Activity types: `0` = Playing, `1` = Streaming, `2` = Listening, `3` = Watching, `5` = Competing

**Adjust the stagger delay:**

```js
// Current range: 5000ms to 15000ms (5–15 seconds)
const delay = Math.floor(Math.random() * 10000) + 5000;
```

Increase the range if you're logging in a large number of bots.

---

## ⚠️ Disclaimer

This tool is intended for managing **bots you own**. Using self-tokens (user accounts) or violating [Discord's Terms of Service](https://discord.com/terms) is not supported and may result in account termination.

---

## 📄 License

This project is open source. Feel free to use, modify, and distribute it.
