const messages = require('../utils/slay_messages');
const chooseOneFromArray = require('./chooseOneFromArray');

function getRandomEmojis() {
    const emojisList = ['✨ ', '😘 ', '💖 ', '🎀 ', '💅 ', '🌟 ', '😍 ', '💕 ', '❤️ ', '🥰 ', '🤩 '];
    let randomEmojis = '';

    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * emojisList.length);
        randomEmojis += emojisList[randomIndex];
    }

    return randomEmojis;
}

module.exports = () => `${getRandomEmojis()} **${chooseOneFromArray(messages)}** ${getRandomEmojis()}`