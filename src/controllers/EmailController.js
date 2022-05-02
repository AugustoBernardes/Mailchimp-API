const axios = require("axios")
const md5 = require("md5");

const MAILCHIMP_KEY = process.env.MAILCHIMP_KEY
const MAILCHIMP_ID = process.env.MAILCHIMP_ID

const NewSubscriberController = (req,res) => {
    const { email } = req.body
    
        let data = {
            
            members:[
                {
                    email_address:email,
                    status:'subscribed',
                    merge_fields:{},
                }
            ]
        }
    
        const postData = JSON.stringify(data)
    
        // Saving subscriber
        axios({
            url:`https://us7.api.mailchimp.com/3.0/lists/${MAILCHIMP_ID}`,
            method:"POST",
            headers:{
                Authorization:`auth ${MAILCHIMP_KEY}`
            },
            data:postData
        }).then(function (response) {
            let emailHash = md5(email.toLowerCase())

            // Adding tags
            axios({
                url:`https://us7.api.mailchimp.com/3.0/lists/${MAILCHIMP_ID}/members/${emailHash}/tags`,
                method:"POST",
                headers:{
                    Authorization:`auth ${MAILCHIMP_KEY}`
                },
                data:{
                    tags:[{name:"Member", status: "active" }]
                }
            }).then(function (response) {
                res.status(200).json({
                    message:"Subscribed"
                })
              })
              .catch(function (error) {
                res.status(400).json({
                    error:error
                })
            })
        
          })
          .catch(function (error) {
            res.status(400).json({
                error:error
            })
        })
}

module.exports = { NewSubscriberController }