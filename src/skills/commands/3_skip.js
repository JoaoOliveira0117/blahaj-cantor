const { SlashCommandBuilder } = require('discord.js')
const createSkill = require('../../helpers/createSkill')

const generateFoiDe = require('../../helpers/generateFoiDe')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Pula a música atual'),
    execute: async (interaction) => createSkill(interaction, 
        async (queue) => {
            await interaction.deferReply();

            const currentTrack = queue.currentTrack
            queue.node.skip()

            return `**${currentTrack.title}** *foi de ${generateFoiDe()}*`
        })
}