const express = require("express")


const { NewSubscriberController } = require("../controllers/EmailController")


const EmailRoute = express.Router()

// GET
EmailRoute.get('/', (req,res) => {
    
    res.status(200).json({
        message:"Home"
    })
})

// POST
EmailRoute.post('/email',NewSubscriberController)

module.exports = EmailRoute