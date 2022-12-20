const express = require("express")
const addUser = require('../controllers/addUser')
const loginUser = require("../controllers/loginUser")
const addUserProject = require("../controllers/addUserProject")
const getAllProjects = require("../controllers/allUserProject")
const deleteProject = require("../controllers/deleteProject")
const updateProject = require("../controllers/editProject")
const passport = require('passport')
const router = express.Router()

router.get("/",(req, res) =>{
    res.json({
        msg: "WOrking"
    })
})

router.get("/tp",(req, res) =>{
    res.json({
        msg: "WOrking"
    })
})
router.post("/user",addUser)
router.post("/user/login", loginUser)
router.delete("/user/project/:id", passport.authenticate('jwt', {session: false}), deleteProject)
router.post("/user/project", passport.authenticate('jwt', {session: false}),addUserProject)
router.get("/user/project", passport.authenticate('jwt', {session: false}), getAllProjects )
router.put("/user/project/:id", passport.authenticate('jwt', {session: false}), updateProject)


module.exports = router