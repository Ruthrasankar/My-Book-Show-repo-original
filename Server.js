if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

/*
or : 
if (process.env.NODE_ENV !== "production"){
    const dotenv = require("dotenv")
    dotenv.config()

}

*/
const express = require("express")
const app = express()
const expresslayouts = require("express-ejs-layouts")

const indexroute = require("./Routes/index.js")


app.set("view engine","ejs")
app.set("views" , __dirname + "/views")
app.set("layout" , "layouts/layout")
app.use(expresslayouts)
app.use(express.static("public"))

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser : true
})

const db = mongoose.connection
db.on ("error" , error => console.error(error))
db.once ("open" , () => console.log("Connected to mongoose of mongodb"))


app.use ("/" , indexroute)

app.listen(process.env.PORT || 3000)


