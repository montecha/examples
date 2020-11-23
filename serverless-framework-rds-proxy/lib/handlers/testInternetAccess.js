const fetch = require('node-fetch')

const testInternetAccess = async (event, context) => {
  console.log(JSON.stringify({ event, context }))

  let response
  try {
    console.log('Fetching data')
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')

    if (!(res.status >= 200 && res.status < 300)) {
      throw new Error('Unsuccessful API response')
    }

    response = {
      statusCode: 200,
      body: JSON.stringify({ 
        internetStatus: 'Online',  
        data: await res.json()
      })
    }
  } catch (error) {
    console.error(error)
    response = {
      statusCode: 500,
      body: JSON.stringify({
        internetStatus: 'Offline',  
        error: error.message
      })
    }
  }

  console.log(response)
  return response
}

module.exports.handler = testInternetAccess
