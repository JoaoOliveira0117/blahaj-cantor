
const { useQueue, useMainPlayer } = require('discord-player');
const { CHANNEL_NOT_FOUND, QUEUE_NOT_FOUND } = require('../utils/errorMessages');
const { followUpEphemeral } = require('../helpers/interactionResponses')

async function createSkill(interaction, callback, forceQueue = false, shouldHaveChannel = true) {
    const player = useMainPlayer();
    let queue = useQueue(interaction.guild.id)
    const hasQueue = !!queue
    
    if(forceQueue) {
        queue = player.nodes.create(interaction.guild)
    }
        
    if (shouldHaveChannel && !interaction.member.voice.channel) {
        return interaction.reply({ content: CHANNEL_NOT_FOUND, ephemeral: true });
    }

    if (!forceQueue && !queue) {
        return interaction.reply({ content: QUEUE_NOT_FOUND, ephemeral: true });
    }

    try {
        const result = await callback(queue, player, hasQueue);
        return followUpEphemeral(result, interaction)
    } catch(e) {
        console.log(e)
        return followUpEphemeral("To bem não, **CHAMA O JOÃO!!**", interaction)
    } finally {
        queue.tasksQueue.release();
    }
}

module.exports = createSkill