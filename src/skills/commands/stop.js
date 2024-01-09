const { SlashCommandBuilder } = require('discord.js')
const createSkill = require('../../helpers/createSkill')
const { STOP_QUEUE } = require('../../utils/errorMessages');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Vou de Guaíba'),
    execute: async (interaction) => createSkill(interaction, 
        async (queue) => {
            await interaction.deferReply();
            queue.delete()
            
            return STOP_QUEUE
        }),
}