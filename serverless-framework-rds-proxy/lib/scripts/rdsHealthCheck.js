require('dotenv').config()
const { Client } = require('pg')

const rdsHealthCheck = async () => {
  console.log('Creating database client')
  const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  })

  let response
  try {
    console.log('Connecting to database')
    await client.connect()

    console.log('Quering the database')
    const { rowCount } = await client.query('SELECT $1::text AS message', ['Hello world!'])
    
    response = {
      statusCode: 200,
      body: JSON.stringify({
        serverTimestamp: new Date().toISOString(),
        db: rowCount === 1 ? 'Ok' : 'Fail'
      })
    }
  } catch (error) {
    console.error(error)
    response = {
      statusCode: 500,
      body: error.message
    }
  } finally {
    console.log('Closing database connection')
    await client.end()
  }

  console.log(response)
  return response
}

rdsHealthCheck()
