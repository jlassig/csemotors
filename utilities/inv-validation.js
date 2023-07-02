const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

// classification rules

validate.classRules = () => {
  console.log("checking Class Rules")
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 3 })
      .isAlpha()
      .withMessage("Provide a correct classification name."),
  ]
}

// check data and return errors or continue
validate.checkClassData = async (req, res, next) => {
  console.log("Checking the data")
  const { classification_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      errors,
      title: "Add New Classification",
      nav,
      classification_name,
    })
    return
  }
  next()
}

validate.vehicleRules = () => {
  return [
    body("inv_price")
      .trim()
      .isNumeric()
      .withMessage("Please provide a valid price."),
    body("inv_miles")
      .trim()
      .isNumeric()
      .withMessage("Please provide a valid number of miles."),
    body("classification_id")
      .trim()
      .isNumeric()
      .withMessage("Please provide a valid classification ID."),
    body("inv_description")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please provide a description."),
    body("inv_image")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please provide an image path."),
    body("inv_thumbnail")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please provide a thumbnail path."),
    body("inv_color")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Please provide a color."),
    body("inv_make")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please provide a make."),
    body("inv_model")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please provide a model."),
    body("inv_year")
      .trim()
      .isNumeric()
      .withMessage("Please provide a valid year."),
  ]
}

validate.checkVehicleData = async (req, res, next) => {
  console.log("inside check vehicle data")
  const {
    inv_price,
    inv_miles,
    classification_id,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_color,
    inv_make,
    inv_model,
    inv_year,
  } = req.body
  // let classification = await invModel.getClassifications()
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-inventory", {
      errors,
      title: "Add New Vehicle",
      nav,
      // classification,
      inv_price,
      inv_miles,
      classification_id,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_color,
      inv_make,
      inv_model,
      inv_year,
    })
    return
  }
  next()
}

module.exports = validate
