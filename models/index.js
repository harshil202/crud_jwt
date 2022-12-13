const dbConfig = require("../config/db.config")
const Sequelize = require('sequelize')

const sequelizeInstance = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool:{
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}) 

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelizeInstance

db.users = require("./User")(sequelizeInstance, Sequelize)
db.userProjects = require("./UserProjects")(sequelizeInstance, Sequelize)
db.projects = require("./Projects")(sequelizeInstance, Sequelize)

db.users.hasMany(db.userProjects, {as: "userProject"})
db.userProjects.belongsTo(db.users, {
    foriegnKey: "userId",
    as: "user"
})

module.exports = db