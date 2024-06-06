const { SlashCommandBuilder, EmbedBuilder, Colors } = require('discord.js');
const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.js') && file !== 'index.js')

module.exports = {
  data: new SlashCommandBuilder().setName('help').setDescription('Mostra todos os comandos disponíveis'),
  async execute(interaction) {
    const fields = [];

    for (const file of files) {
      const command = require(`./${file}`)

      if (!('data' in command || 'execute' in command) || command.data.name === 'help') {
          continue;
      }

      fields.push({ name: "/" + command.data.name, value: `_${command.data.description}_`})
    }
    
    const embed = new EmbedBuilder()
      .setTitle("Comandinhos ✨")
      .setDescription("Qualquer coisa só chamar o jaum!")
      .setColor(0xEEBFB9)
      .setImage("https://media1.tenor.com/m/Nc84xrdZozgAAAAC/ikea-shark.gif")
      .addFields(fields)

    return interaction.reply({ embeds: [embed] })
  }
}