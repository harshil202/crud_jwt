const db = require('../models')
const UserProjects = db.userProjects
var JWT_PAYLOAD = process.env.JWT_PAYLOAD


module.exports = async (req, res) =>{
    let projectTitle = await UserProjects.findOne({
        where:{
            title: req.body.title
        }
    })
    console.log("JWT_PAYLOAD", JWT_PAYLOAD)

    if(projectTitle){
        res.json({
            status:"Error",
            message: "Project of same name is already exists"
        })
    }
    else{
        await UserProjects.create({
            title: req.body.title,
            userId: req.body.userId
        }).then(data =>{
            res.json({
                status: "Success",
                message: "Project added",
                data: data
            })
        }).catch(err => {
            res.json({
                status:"error",
                message: err
            })
        })
    }
    
}