const { readUsers, addCourse, getCourse } = require("../controllers/adminController")
const router = require("express").Router()
router
    .get("/users", readUsers)
    .post("/course", addCourse)
    .get("/course", getCourse)

module.exports = router