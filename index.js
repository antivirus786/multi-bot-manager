const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const tokens = fs.readFileSync('token.txt', 'utf-8')
    .split(/\r?\n/)
    .filter(t => t.trim() !== '');

console.log(`--- Multi-Bot Manager Loaded ---`);
console.log(`Found ${tokens.length} tokens. Starting deployment...`);

async function startBots() {
    for (const [index, token] of tokens.entries()) {
        const client = new Client({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
        });

        client.on('ready', () => {
            console.log(`[${index + 1}/${tokens.length}] Online: ${client.user.tag}`);
            //client.user.setActivity('Your MuM', { type: 2 }); // "Listening to..."
        });

        client.on('error', (err) => {
            console.error(`[Error] Bot ${index + 1} encountered: ${err.message}`);
        });

        try {
            await client.login(token);
            
            // THE "DIRTY TRICK" DELAY: 
            // Staggers login between 5 to 15 seconds so Discord doesn't see a "spike"
            const delay = Math.floor(Math.random() * 10000) + 5000;
            if (index < tokens.length - 1) {
                console.log(`Waiting ${delay/1000}s before next login...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        } catch (error) {
            console.error(`[Failed] Token ${index + 1} is invalid or rate-limited.`);
        }
    }
}

startBots();