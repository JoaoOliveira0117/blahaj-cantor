module.exports = (client) => {
    client.on('messageCreate', (message => {
        if (message.content === 'ping') {
            message.reply('pong')
        }
    }))
}