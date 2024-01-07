const { Events } = require("discord.js")

const client = require("../services/discord")
const onMessage = require('./events/onMessage')
const initCommands = require('./commands/index')

module.exports = {
    init: () => {
        onMessage(client)
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
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        });
        client.login(process.env.BOT_TOKEN)
    }
}