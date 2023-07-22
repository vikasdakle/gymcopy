const razorpay = require("razorpay");
const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const { v4: uuid } = require("uuid")
const crypto = require("crypto");
const { request } = require("http");

exports.register = asyncHandler(async (req, res) => {
    const { password, email } = req.body
    const found = await User.findOne({ email })
    if (found) {
        return res.status(400).json({
            message: "email already exist"
        })
    }
    const hashPass = bcrypt.hashSync(password, 10)
    const result = await User.create({ ...req.body, password: hashPass })
    res.json({
        message: "user register success"
    })
})



exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const found = await User.findOne({ email })
    if (!found) {
        return res.status(400).json({ message: "email not found" })
    }
    const verify = bcrypt.compareSync(password, found.password)
    if (!verify) {
        return res.status(400).json({ message: "invalid password" })
    }
    const token = jwt.sign({ id: found._id, role: found.role }, process.env.JWT_KEY)
    res.cookie("token", token)
    res.json({
        message: "user login success",
        result: {
            id: found._id,
            name: found.name,
            email: found.email,
            role: found.role
        }
    })
})
exports.continueWithGoogle = asyncHandler(async (req, res) => {
    res.json({
        message: "continue with google success"
    })
})




exports.initiatePayment = asyncHandler(async (req, res) => {
    const instance = new razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET_KEY
    })

    const { Coursefee } = req.body

    instance.orders.create({
        amount: Coursefee * 100,
        currency: "INR",
        receipt: uuid()
    }, (err, order) => {
        if (err) {
            return res.status(400).json({
                message: "Order Fail " + err
            })
        }
        res.json({
            message: "Payment Intitiated",
            result: order.id
        })
    })
})



exports.GetKey = asyncHandler(async (req, res) => {
    res.json({ key: process.env.RAZORPAY_KEY })
});



// exports.PaymentVerification = asyncHandler((req, res) => {
//     console.log(req.body)
// })

exports.verifyPayment = asyncHandler(async (req, res) => {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    const key = `${razorpay_order_id}|${razorpay_payment_id}`

    // const signature = crypto
    //     .createHmac("sha256", process.env.RAZORPAY_SECRET)
    //     .update(toString(key))
    //     .digest("hex")
    // console.log(signature)
    // if (signature !== razorpay_signature) {
    //     return res.status(400).json({
    //         message: "Invalid Signature"
    //     })
    // }

    // console.log(req.cookies)
    // if (!req.cookies) {
    //     return res.status(401).json({ message: `Inavlid Request` })
    // }
    // const { token } = req.cookies
    // if (!token) {
    //     return res.status(401).json({ message: `Please Provide Token` })
    // }
    // const { userId } = jwt.verify(token, process.env.JWT_KEY)

    // const result = await Order.create({
    //     userId,
    //     paid: true
    // })
    res.json({ message: `Order Placed Success` })



})


