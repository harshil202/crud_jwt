module.exports = (sequelize, Sequelize) =>{
    const Projects = sequelize.define("project", {
        projectId:{
            type:Sequelize.INTEGER
        }
    })

    return Projects
}