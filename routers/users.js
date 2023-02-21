const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');


router.get('/', async (req, res) => {
    const userList = await User.find().select('-password')
    if(!userList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(userList)
});


router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found'})
    }
    res.status(200).send(user);
});

router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        street: req.body.street,
        apartment: req.body.apartment,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
    })

    user = await user.save();
    
    if(!user)
    return res.status(400).send('The user cannot be created')

    res.send(user);
});


router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;

    if(!user) {
        return res.status(400).send('The user was not found');
    }

    if(user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            { expiresIn: '1d' }
        )
        res.status(200).send({user: user.email, token: token})
    } else {
        res.status(400).send('The password is wrong!');
    }
})


router.get('/get/count', async (req, res) => {
    const userCount = await User.countDocuments();

    if(!userCount) {
        res.status(500).json({success: false})
    }
    res.send({
        userCount: userCount
    })
});

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).then(user => {
        if(user) {
            return res.status(200).json({success: true, message: 'user has been deleted'})
        } else {
            return res.status(404).json({success: false, message: 'user not found'})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })
});

module.exports = router