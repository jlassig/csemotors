/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const path = require("path") ///so I can serve up static images? for the crash image for the 404 screen.
const app = express()
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const errorRoute = require("./routes/errorRoute")
const utilities = require("./utilities/")

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")
app.use(express.static(path.join(__dirname, "public"))) // <--here is where i tell the path to use the "public" folder (this is for that ONE image for the 404 error screen!)
/* ***********************
 * Routes
 *************************/
app.use(require("./routes/static"))
//Index route:
app.use("/error", utilities.handleErrors(errorRoute))
app.use("/inv", utilities.handleErrors(inventoryRoute))
app.get("/", utilities.handleErrors(baseController.buildHome))

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({
    status: 404,
    message: "You seem to to be lost. Please try a different path.",
  })
})

/* ***********************
 * Express Error Handler
 * Place after all other middleware
 *************************/

app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)

  if (err.status === 404) {
    res.render("errors/error", {
      title: err.status || "Not Found",
      message: err.message,
      nav,
    })
  } else if (err.status === 500) {
    res.render("errors/error500", {
      title: err.status || "Server Error",
      message: "Oh no! There was a crash. Maybe try a different route?",
      nav,
    })
  } else {
    res.render("errors/error500", {
      title: err.status || "Server Error",
      message: err.message || "Internal Server Error",
      nav,
    })
  }
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
