const { EmbedBuilder } = require('discord.js')
const { Player } = require('discord-player')
const client = require('./discord')

module.exports = async () => {
    const player = new Player(client, {
        ytdlOptions: {
            quality: 'highestaudio',
            highWaterMark: 1 << 25
        }
    })
    await player.extractors.loadDefault()
    player.events.on('playerStart', (queue, track) => {
        const embed = new EmbedBuilder()
            .setDescription(`Tocando: \n**[${track.title}](${track.url})**`)
            .setThumbnail(track.thumbnail)
            .addFields([
                {
                    name: 'Duração',
                    value: track.duration,
                    inline: true
                },
                {
                    name: 'Adicionado por',
                    value: queue.metadata.member.user.globalName,
                    inline: true
                }
            ])
        
        queue.metadata.channel.send({ embeds: [embed] })
    })

    player.events.on('error', (error) => {
        console.log(error)
    })
}