// Needed Resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const invController = require("../controllers/invController")
const invValidate = require("../utilities/inv-validation")
const regValidate = require("../utilities/account-validation")

// Route to build inventory by classification view
router.get(
  "/",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  invController.buildManagement
)

router.get("/type/:classificationId", invController.buildByClassificationId)
router.get("/detail/:inv_id", invController.buildByVehicleInvId)

router.get("/add-inventory", invController.buildAddInventory)
router.post(
  "/add-inventory",
  invValidate.vehicleRules(),
  invValidate.checkVehicleData,
  utilities.handleErrors(invController.addInventory)
)

router.get("/add-classification", invController.buildAddClassification)
router.post(
  "/add-classification",
  invValidate.classRules(),
  invValidate.checkClassData,
  utilities.handleErrors(invController.AddClassification)
)

router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
)
router.get("/edit/:inv_id", utilities.handleErrors(invController.buildEdit))
router.post(
  "/update/",
  invValidate.vehicleRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

router.get("/delete/:inv_id", utilities.handleErrors(invController.buildDelete))
router.post("/delete/", utilities.handleErrors(invController.deleteInventory))

router.get(
  "/upgrade/:upgrade_id/:inv_id",
  utilities.handleErrors(invController.buildUpgrade)
)

module.exports = router
