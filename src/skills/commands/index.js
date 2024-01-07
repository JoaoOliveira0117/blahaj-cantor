const { Collection } = require('discord.js');
const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.js') && file !== 'index.js')

module.exports = (client) => {
    client.commands = new Collection()

    for (const file of files) {
        const command = require(`./${file}`)

        if (!('data' in command && 'execute' in command)) {
            console.log(`[AVISO] O comando ${file} não possui propriedade "data" ou "execute".`)
            continue;
        }

        client.commands.set(command.data.name, command)
    }
}