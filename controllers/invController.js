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
    let nav = await utilities.getNav()
    if (data.length > 0) {
      const className = data[0].classification_name
      const grid = await utilities.buildClassificationGrid(data)
      res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
      })
    } else {
      const grid =
        "There are currently no vehicles listed under that classification."
      res.render("./inventory/classification", {
        title: "No vehicles",
        nav,
        grid,
      })
    }
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
    const classDropDown = await utilities.buildClassDropdown()
    res.render("./inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
      classDropDown,
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
  let classDropDown = await utilities.buildClassDropdown()
  let nav = await utilities.getNav()
  if (addClass) {
    req.flash(
      "notice",
      `The ${classification_name} classification was successfully added`
    )
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      classDropDown,
    })
  } else {
    req.flash("error", "Provide a correct classification name")
    res.status(501).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      classDropDown,
    })
  }
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invController.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(
    classification_id
  )
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

// build Edit - this is a tool for managers to edit the inventory items.
invController.buildEdit = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  console.log(inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getVehicleByInvId(inv_id)
  // console.log(itemData)
  // console.log(itemData.inv_make)
  let classDropDown = await utilities.buildClassDropdown(
    itemData[0].classification_id
  )
  const itemName = `${itemData[0].inv_make} ${itemData[0].inv_model}`
  try {
    res.render("./inventory/edit-inventory", {
      title: "Edit:  " + itemName,
      nav,
      classDropDown: classDropDown,
      errors: null,
      inv_id: itemData[0].inv_id,
      inv_make: itemData[0].inv_make,
      inv_model: itemData[0].inv_model,
      inv_year: itemData[0].inv_year,
      inv_description: itemData[0].inv_description,
      inv_image: itemData[0].inv_image,
      inv_thumbnail: itemData[0].inv_thumbnail,
      inv_price: itemData[0].inv_price,
      inv_miles: itemData[0].inv_miles,
      inv_color: itemData[0].inv_color,
      classification_id: itemData[0].classification_id,
    })
  } catch (error) {
    error.status = 500
    console.error(error.status)
    next(error)
  }
}

/* ***************************
 *  Update Inventory Data
 * ************************** */
invController.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body
  const updateResult = await invModel.updateInventory(
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    const classDropDown = await utilities.buildClassDropdown(
      req.body.classification_id
    )
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/edit-inventory", {
      title: "Edit " + itemName,
      nav,
      classDropDown: classDropDown,
      errors: null,
      inv_id,
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
    })
  }
}

module.exports = invController
