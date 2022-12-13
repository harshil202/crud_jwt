const db = require("../models")
const UserProject = db.userProjects

module.exports = async (req, res) =>{
    console.log(req.params.id)
    console.log(req.body.title)
    await UserProject.update(req.body, {
        where:{
            id: req.params.id
        }
    }).then(num =>{
        if(num == 1){
            res.json({
                status: "Success",
                message: "Data updated successfully",
            })
        }
    }).catch(err =>{
        res.json({
            status: "Error",
            message: "Can't update the data"
        })
    })
}