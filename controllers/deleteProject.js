const db = require("../models")
const UserProject = db.userProjects

module.exports = async (req, res) =>{
    console.log("something")
    await UserProject.destroy({
        where:{
            id: req.params.id
        }
    }).then(num =>{
        if(num == 1){
            res.json({
                status:"Success",
                message: "Data deleted Successfully"
            })
        }
    }).catch(err =>{
        res.json({
            status: "Error",
            message: err
        })
    })
}