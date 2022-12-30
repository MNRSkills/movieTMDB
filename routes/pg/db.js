const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.POOL_USERS,
    host: process.env.POOL_HOST,
    database: process.env.POOL_DATABASE,
    password: process.env.POOL_PASSWORD,
    port: process.env.POOL_PORT
})

// const getUsers = (request, response) => {
//     pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).json(results.rows)
//     })
//   }



module.exports = pool; 