const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const Course = require("../models/Course")

exports.readUsers = asyncHandler(async (req, res) => {
    const result = await User.find()
    res.json({
        message: "all user fetch success",
        result
    })
})

exports.addCourse = asyncHandler(async (req, res) => {
    await Course.create(req.body)
    res.json({
        message: "Course Added success",
    })
})

exports.getCourse = asyncHandler(async (req, res) => {
    const result = await Course.find()
    res.json({
        message: "Course Fetched success",
        result
    })
})