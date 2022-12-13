const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config()
const db = require("../models")
const Users = db.users
const BCRYPT_SALT_ROUND = 12  

module.exports = async (req, res) =>{
    let user = await Users.findOne({
        where:{
            email: req.body.email
        }
    })
    if(user){
        res.json({
            status: "Error",
            message:"User is already exists"
        })
    }else{
        const hashedPassword = await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUND)
    console.log(BCRYPT_SALT_ROUND)
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        country: req.body.country 
    }
    console.log(hashedPassword)
    Users.create(newUser).then((result) => {
        res.json({
            status:"Success",
            message: "User created",
            data: result
        })
    }).catch((err) => {
        res.json({
            status: "Error",
            message: err
        })
    });
    }

    
}
