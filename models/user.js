const db = require('../db')
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class UserModel {
    
    
    async createUser(req, res) {
        const { password, email, first_name, last_name, created  } = req.body
        const results = await pool.query('INSERT INTO users (password, email, first_name, last_name, created) VALUES ($1, $2, $3, $4, now()) RETURNING *', [password, email, first_name, last_name, created],
        (error, results) => {
            if(error) {
                throw error
            }
            response.status(201).send(`User registered with ID: ${results.rows[0].id}`)
        })
    }
}