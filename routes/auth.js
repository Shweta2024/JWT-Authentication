const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function userExist(userEmail) {
    const user = await User.findOne({ email: userEmail })
    return user
}

router.post('/register', async (req, res) => {
    try {
        const isUserPresent = await userExist(req.body.email)

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
        const verifyUser = await bcrypt.compare(req.body.password, user.password) // returns true or false
        
        if (verifyUser) {
            // once user has successfully logged in, then generate token for him
            // and add that token to the header of the response
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.header('auth-token',token) // auth-token -> its just a name to identify the token; we can name it anything
            
            console.log(token)
            return res.status(200).send('Logged in successfully!')
        }
        else {
            return res.status(400).send('message: Incorrect password!')
    
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router