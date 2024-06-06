const { Events } = require("discord.js")

const client = require("../services/discord")
const initCommands = require('./commands/index')
const initPlayer = require('../services/player')

const { INTERACTION_NOT_DEFERED_NOR_REPLIED } = require('../utils/errorMessages');

module.exports = {
    init: async () => {
        await initPlayer()
        initCommands(client)
        client.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isChatInputCommand()) return;
        
            const command = interaction.client.commands.get(interaction.commandName);
        
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
        
            try {
                await command.execute(interaction);
            } catch (error) {
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: INTERACTION_NOT_DEFERED_NOR_REPLIED, ephemeral: true });
                } else {
                    await interaction.reply({ content: INTERACTION_NOT_DEFERED_NOR_REPLIED, ephemeral: true });
                }
                console.log(error)
            }
        });
        client.login(process.env.BOT_TOKEN)
    }
}