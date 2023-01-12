const Pool = require('pg').Pool

const newPool = new Pool({
    user: process.env.POOL_USERS,
    host: process.env.POOL_HOST,
    database: process.env.POOL_DATABASE,
    password: process.env.POOL_PASSWORD,
    port: process.env.POOL_PORT
})



module.exports = newPool; 