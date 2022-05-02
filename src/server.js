const express  = require("express")
const dotenv  = require("dotenv")

const bodyParser  = require("body-parser")
const cors  = require("cors")

dotenv.config()

// Dotenv Variables
const PORT = process.env.PORT

// Routes
const EmailRoute  = require("./routes/EmailRoutes")

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', EmailRoute)


app.listen(PORT || 3434, () => { 
    console.log(`🚀 Server is running on PORT:${PORT}`)
})