const { SlashCommandBuilder } = require('discord.js')
const { QueryType } = require('discord-player');
const createSkill = require('../../helpers/createSkill')
const { QUEUE_AND_URL_NOT_FOUND, QUEUE_EXISTS_URL_NOT_FOUND, ADDED_TO_QUEUE } = require('../../utils/errorMessages');
const { createAudioPlayer, joinVoiceChannel, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Inicia a revolução adicionando a música à fila')
        .addStringOption(o => o.setName("url").setDescription("Link da música ( Youtube )").setRequired(false)),
    execute: async (interaction) => createSkill(interaction, 
        async (queue, _player, hasQueue) => {
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

            const player = createAudioPlayer()

            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            })

            connection.subscribe(player)

            const stream = ytdl(url, { filter: 'audioonly' })
            const resource = createAudioResource(stream)

            player.play(resource)

            player.on(AudioPlayerStatus.Playing, () => {
                console.log('The bot is now playing!');
            });

            player.on('error', error => {
                console.error('Error:', error.message);
            });

            return "uau"
        }
        , true),
}