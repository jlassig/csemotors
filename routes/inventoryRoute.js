// Needed Resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const invController = require("../controllers/invController")
const invValidate = require("../utilities/inv-validation")

// Route to build inventory by classification view
router.get("/", invController.buildManagement)
router.get("/type/:classificationId", invController.buildByClassificationId)
router.get("/detail/:inv_id", invController.buildByVehicleInvId)
router.get("/add-inventory", invController.buildAddInventory)
router.post(
  "/add-inventory",
  invValidate.vehicleRules,
  invValidate.checkVehicleData,
  invController.addInventory
)

router.get("/add-classification", invController.buildAddClassification)
router.post(
  "/add-classification",
  invValidate.classRules(),
  invValidate.checkClassData,
  invController.AddClassification
)

module.exports = router
