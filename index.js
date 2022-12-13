const express = require('express')
const db = require("./models/")
const userRoutes = require("./routes/userRoutes")
const passport = require('passport')

// const sequelize = require('sequelize')
const User = db.users
const UserProjects = db.userProjects
const Project = db.projects

const app = express()
app.use(express.json())
app.use(passport.initialize())

db.sequelize.sync().then(() => {
    console.log("Table created");
  });

app.use("/api", userRoutes)

app.listen(3000, () =>{
    console.log("Server is running on port 3000")
})