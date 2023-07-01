const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
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

invCont.buildByVehicleInvId = async function (req, res, next) {
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
invCont.buildManagement = async function (req, res, next) {
  try{
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
    } )}catch (error) {
    error.status = 500
    console.error(error.status)
    next(error)
    }}


invCont.buildAddInventory = async function (req, res, next) {
  try {
    let nav = await utilities.getNav()
    res.render("./inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      errors: null,
    })
  } catch (error) {
    error.status = 500
    console.error(error.status)
    next(error)
  }
}


invCont.buildAddClassification = async function (req, res, next) {
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


module.exports = invCont
