const messages = require('../utils/foiDe_messages');
const chooseOneFromArray = require('./chooseOneFromArray');

module.exports = () => {
    return chooseOneFromArray(messages)
}