const { Message, User } = require('../../db');

const postMessage = async (message) => {
    try {
      // Validar los campos obligatorios
        if (!message.name || !message.email || !message.message) {
            throw new Error('Name, email, and message are required');
        }
        const newMessage = await Message.create({
            name: message.name,
            email: message.email,
            message: message.message,
        });
        const user = await User.findOne();
        if (!user) {
            throw new Error('No user found');
        }
        await user.addMessage(newMessage);
        return newMessage;
    } catch (error) {
        throw new Error('Error creating and associating message');
    };
};

module.exports = postMessage;