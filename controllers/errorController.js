const errorController = {}
errorController.generateError = function (req, res, next) {
  try {
    ///for getting the error:
    const error = new Error("Error 500")
    error.status = 500
    throw error
  } catch (error) {
    next(error)
  }
}

module.exports = errorController
