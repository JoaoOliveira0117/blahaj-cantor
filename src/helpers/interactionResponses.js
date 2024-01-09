const defaults = {
    removeAttachments: true
}

module.exports = {
    followUpEphemeral: (content, interaction) => interaction.followUp({ content, ephemeral: true, ...defaults }),
    replyEphemeral: (content, interaction) => interaction.followUp({ content, ephemeral: true, ...defaults })
}