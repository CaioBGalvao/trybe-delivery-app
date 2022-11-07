const { User } = require('../../database/models');

const findAll = async () => User.findAll();
const findById = async (id) => User.findByPk(id);

module.exports = { findAll, findById };