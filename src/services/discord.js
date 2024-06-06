const { Client, GatewayIntentBits, Events } = require('discord.js')
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] })

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    c.user.setPresence({
        status: "online",
        game: {
            name: "comandos /help",
            type: "STREAMING",
        }
    })
});

module.exports = client