const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email })

        //check if user already exists
        if (userExist)
            return res.status(400).send('message: User Already Exists!')

        //hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
    
        const newUser = await user.save()
        res.status(201).send({
            "id": user._id,
            "name": user.name
        })
    }
    catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router