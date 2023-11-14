const router = require('express').Router()
const jwt = require('jsonwebtoken')

// middleware to verify token
function verifyToken(req, res, next) {

    if (!req.header('auth-token'))
        return res.status(401).send('Access Denied!')

    try {
        // we get an object containg feild(that we used to create the token) and iat
        const userID = jwt.verify(req.header('auth-token'), process.env.JWT_SECRET)
        req.user = userID
        next()
    }
    catch (error) {
        res.status(400).send('Invalid Token!')
    }
}

router.get('/home', verifyToken, (req, res) => {
    res.send('welcome')
})

module.exports = router