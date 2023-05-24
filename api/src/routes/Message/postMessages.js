const postMessage = require('../../controllers/Message/postMessage');

const postMessages = async (req, res) => {
    try {
        const message = await postMessage(req.body);

        res.status(200).json(message);
    } catch (error) {
        if (error.message === 'Name, email, and message are required') {
            res.status(400).json({ error: error.message });
        } else if (error.message === 'No user found') {
            res.status(404).json({ error: error.message });
        } else if (error.message === 'Error creating and associating message') {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        };
    };
};

module.exports = postMessages;