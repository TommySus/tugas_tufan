const { User } = require('../models')

class UserController {
    static login(req, res) {
        User.findOne({where: {email: req.body.email}})
        .then(data => {
            if (data) {
                if(req.body.password == data.password) {
                    const user = {
                        username: data.username
                    }
                    res.status(200).json(user)
                } else {
                    res.status(404).json({message: 'wrong email/pasword'})
                }
            } else {
                res.status(404).json({message: 'email not registered'})
            }
        })
        .catch(error => {
            res.status(500).json({message: error})
        })
    }

    static register(req, res) {
        const obj = {
            username: req.body.username, 
            email: req.body.email,
            password: req.body.password,
            updatedAt: new Date(),
            createdAt: new Date
        }
        User.create(obj)
        .then(data => {
            res.status(201).json({
                id: data.id,
                username: data.username, 
                email: data.email
            })
        })
        .catch(error => {
            res.status(500).json({message: error})
        })
    }

}

module.exports = UserController