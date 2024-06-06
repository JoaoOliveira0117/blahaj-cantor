const { SlashCommandBuilder } = require('discord.js')
const { QueryType } = require('discord-player');
const createSkill = require('../../helpers/createSkill')
const { QUEUE_AND_URL_NOT_FOUND, QUEUE_EXISTS_URL_NOT_FOUND, ADDED_TO_QUEUE } = require('../../utils/errorMessages');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Inicia a revolução adicionando a música à fila')
        .addStringOption(o => o.setName("url").setDescription("Link da música ( Youtube )").setRequired(false)),
    execute: async (interaction) => createSkill(interaction, 
        async (queue, player, hasQueue) => {
            await interaction.deferReply();
            
            const urlObject = interaction.options.get('url', false);
            const url = urlObject ? urlObject.value : null;

            if (!url && !hasQueue) {
                return QUEUE_AND_URL_NOT_FOUND
            }

            if(!url && hasQueue) {
                queue.node.setPaused(false)
                return QUEUE_EXISTS_URL_NOT_FOUND
            }
        
            const result = await player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
    
            const track = result.tracks[0]

            await queue.addTrack(track)

            queue.setMetadata(interaction)

            if(!queue.connection) {
                await queue.connect(interaction.member.voice.channel)
            }

            if(!queue.isPlaying()) {
                await queue.node.play()
            }

            return ADDED_TO_QUEUE(track)
        }
        , true),
}