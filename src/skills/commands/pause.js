const { SlashCommandBuilder } = require('discord.js')
const createSkill = require('../../helpers/createSkill')
const { QUEUE_PAUSED } = require('../../utils/errorMessages');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pausa a música atual'),
    execute: async (interaction) => createSkill(interaction, 
        async (queue) => {
            await interaction.deferReply();
            queue.node.setPaused(true)
            
            return QUEUE_PAUSED
        }),
}