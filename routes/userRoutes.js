const { register, login, initiatePayment, GetKey, verifyPayment, } = require("../controllers/userController")


const router = require("express").Router()

router

    .post("/register", register)
    .post("/login", login)
// .post("/initiate-Payment", initiatePayment)
// .get("/getKey", GetKey)
// .post("/payment-verification", verifyPayment)


module.exports = router