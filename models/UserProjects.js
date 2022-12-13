module.exports = (sequelize, Sequelize) =>{
    const UserProjects = sequelize.define("userProjects", {
        title:{
            type: Sequelize.STRING
        }
    })

    return UserProjects
}