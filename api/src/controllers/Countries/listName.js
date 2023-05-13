const { Country } = require('../../db');
const { conn } = require('../../db');

const listName = async () => {
    try {
        const names = await Country.findAll({
            attributes: [[conn.fn('DISTINCT', conn.col
            ('name')), 'name']]
        });

        const nameValues = names.map(name => 
            name.get('name'));

        return nameValues;
        
    } catch (error) {
        throw new Error(`Error searching for name: ${error.message}`);
    }
};

module.exports = listName;