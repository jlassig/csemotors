// Needed Resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")

router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildManagement)
)
router.get("/login", utilities.handleErrors(accountController.buildLogin))
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)
router.get("/register", utilities.handleErrors(accountController.buildRegister))
// Process the registration data
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)
router.get("/logout", utilities.handleErrors(accountController.logoutUser))

router.get(
  "/edit/:account_id",
  utilities.handleErrors(accountController.buildAccountEdit)
)
router.post(
  "/updateaccount",
  regValidate.updateAcctRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(accountController.updateAccount)
)

router.post(
  "/updatepassword",
  regValidate.updatePassRules(),
  regValidate.checkUpdatePass,
  utilities.handleErrors(accountController.updatePassword)
)

// router.get(
//   "/management",
//   utilities.handleErrors(accountController.buildManagement)
// )

module.exports = router
