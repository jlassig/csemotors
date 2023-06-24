const express = require("express")
const router = express.Router()
const errorController = require("../controllers/errorController")

// Route to 500 error
router.get("/generate-error", errorController.generateError)

module.exports = router
