const Part = require('../models/parts');

const createPart = async (part) => {
    const newPart = await new Part(part);
    return newPart.save();
}

module.exports = { createPart }