const { SlashCommandBuilder } = require('discord.js')
const { QueryType } = require('discord-player');
const createSkill = require('../../helpers/createSkill')
const generateSlay = require('../../helpers/generateSlay')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('potaxie')
        .setDescription('😍😍✨🌟💖🎀以佳飞之声开始革命💅🎀💖😘🤫✨'),
    execute: async (interaction) => createSkill(interaction, 
        async (queue, player) => {
            await interaction.deferReply();

            const entry = await player.search(process.env.POTAXIE_PLAYLIST, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })

            if(!queue.connection) {
                await queue.connect(interaction.member.voice.channel)
            }

            await queue.addTrack(entry.tracks)

            queue.setMetadata(interaction)

            if(!queue.isPlaying()) {
                queue.tracks.shuffle()
                await queue.node.play()
            }

            return generateSlay()
        }, true)
}