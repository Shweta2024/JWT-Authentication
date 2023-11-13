const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')

async function userExist(userEmail) {
    const user = await User.findOne({ email: userEmail })
    return user
}

router.post('/register', async (req, res) => {
    try {
        const isUserPresent = userExist(req.body.email)

        //check if user already exists
        if (isUserPresent)
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

router.post('/login', async (req, res) => {
    try {
        const user = await userExist(req.body.email)

        // user not found
        if (!user)
            return res.status(404).send('message: User not found!')

        //if user exists checks if password is correct
        const verifyUser = await bcrypt.compare(req.body.password,user.password)
        
        if (verifyUser)
            return res.status(200).send('Logged in successfully!')
        else
            return res.status(400).send('message: Incorrect password!')
    }
    catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router