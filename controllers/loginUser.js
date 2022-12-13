const bcrypt = require("bcrypt")
const passport = require('passport')
const passportJwt = require("passport-jwt")
const dotenv = require('dotenv').config()
const db = require('../models/index')
const jwt = require('jsonwebtoken')
const User = db.users
var JWT_PAYLOAD = process.env.JWT_PAYLOAD


let ExtractJwt = passportJwt.ExtractJwt
let JwtStrategy = passportJwt.Strategy

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = "JWT-TOKEN"

//Create strategy for webtoken
let strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) =>{
    console.log("Payload received", jwt_payload)
    JWT_PAYLOAD = jwt_payload
    let user = User.findOne({
        where:{
            id: jwt_payload.id
        }
    })
  
    if(user){
      next(null, user)
    }else{
      next(null, false)
    }
  })
  
  //Use the strategy
passport.use(strategy)

console.log("ghujghjghjdhjdghm",strategy)

module.exports = async (req, res) =>{
    let user = await User.findOne({
        where:{
            email: req.body.email
        }
    })

    console.log(req.body.email)
    console.log(user)

    if(!user){
        return res.json({
            status: "Error",
            message: "User does not exists"
        })
    }
    let status = await bcrypt.compare(req.body.password, user.password)
    if(status){
        let payload = {id: user.id}
        let token = jwt.sign(payload, jwtOptions.secretOrKey)
        
    res.json({
      status:"Success",
      message: "Login",
      token: token
    })
    }else{
        res.status(401).json({
            status: "error",
            message: "Password is incorrect",
          })
    }
 } 