const client = require('./client')
const { createUser } = require('./helpers/users')
const { users } = require('./seedData')

const dropTables = async () => {
  await client.query(`
        DROP TABLE IF EXISTS users;
    `)
  console.log('Dropped Tables')
}

const createTables = async () => {
  await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `)
    console.log('Created Tables')
}

const seedDb = async () => {
  console.log('Creating Users...')
  for (const user of users) {
    await createUser(user)
  }
}

const initDb = async () => {
  console.log('init')
  try {
    client.connect()
    await dropTables()
    await createTables()
    await seedDb()
    console.log('DB is seeded and ready to go!!')
  } catch (error) {
    console.error(error)
  } finally {
    client.end()
  }
}

initDb()