const { Client } = require('pg')

const bcrypt = 'bcrypt'
const client = new Client(`postgres://localhost:5432/${bcrypt}`)

module.exports = client