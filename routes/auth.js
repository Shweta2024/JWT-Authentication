const router = require('express').Router()
const User = require('../model/User')

router.post('/register', async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email })

        //check if user already exists
        if (userExist)
            return res.status(400).send('message: User Already Exists!')

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
    
        const newUser = await user.save()
        res.status(201).send(newUser)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router