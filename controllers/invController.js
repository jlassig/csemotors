const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invController = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invController.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(
      classification_id
    )
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    })
  } catch (error) {
    error.status = 500
    console.error(error.status)
    next(error)
  }
}

// build single page inventory

invController.buildByVehicleInvId = async function (req, res, next) {
  try {
    const inv_id = req.params.inv_id
    const data = await invModel.getVehicleByInvId(inv_id)
    const infoPage = await utilities.buildVehicleInfo(data)
    let nav = await utilities.getNav()
    const vehicleName =
      data[0].inv_year + " " + data[0].inv_make + " " + data[0].inv_model
    res.render("./inventory/individual", {
      title: vehicleName,
      nav,
      infoPage,
    })
  } catch (error) {
    error.status = 500
    console.error(error.status)
    next(error)
  }
}

// build management view
invController.buildManagement = async function (req, res, next) {
  try {
    let nav = await utilities.getNav()
    res.render("./inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    })
  } catch (error) {
    error.status = 500
    console.error(error.status)
    next(error)
  }
}

// build Add Inventory
invController.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classDropDown = await utilities.buildClassDropdown()
  try {
    res.render("./inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classDropDown,
      errors: null,
    })
  } catch (error) {
    error.status = 500
    console.error(error.status)
    next(error)
  }
}

invController.addInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classDropDown = await utilities.buildClassDropdown()
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body

  try {
    const carInfo = await invModel.addNewVehicle(
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    )
    console.log(carInfo)
    if (carInfo) {
      req.flash("notice", `You\'ve added another vehicle to the inventory`)
      res.status(201).render("inventory/management", {
        title: "Vehicle Management",
        nav,
        classDropDown,
        errors: null,
      })
    } else {
      req.flash(
        "error",
        "There was an error. Check your information and try again."
      )
      res.status(501).render("inventory/add-inventory", {
        title: "Add New Vehicle",
        nav,
        classDropDown,
        errors: null,
      })
    }
  } catch (error) {
    req.flash("error", "Sorry, there was an error processing your request.")
    res.status(500).render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classDropDown,
      errors: null,
    })
  }
}

// build add Classification

invController.buildAddClassification = async function (req, res, next) {
  try {
    let nav = await utilities.getNav()
    res.render("./inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: null,
    })
  } catch (error) {
    error.status = 500
    console.error(error.status)
    next(error)
  }
}

// process add Classification
invController.AddClassification = async function (req, res, next) {
  const { classification_name } = req.body
  const addClass = await invModel.addNewClassification(classification_name)
    let nav = await utilities.getNav()
  if (addClass) {
    req.flash("notice", `The ${classification_name} classification was successfully added`)
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
    })
  } else {
    req.flash("error", "Provide a correct classification name")
    res.status(501).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
    })
  }

}

module.exports = invController
