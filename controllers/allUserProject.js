const db = require("../models")
const UserProjects = db.userProjects

module.exports = async (req, res) =>{
    console.log("asasdcasdcsdacsadcasc", process.env.JWT_PAYLOAD)
    UserProjects.findAll({
        include: ['user']
    }).then(project =>{
        res.json({
            status:"Success",
            message: "Retrived",
            data: project
        })
    }).catch(err =>{
        res.json({
            status: "Error",
            message: err
        })
    })
}