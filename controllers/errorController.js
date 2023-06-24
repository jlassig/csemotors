const errorController = {}
errorController.generateError = function (req, res, next) {
  try{
    console.log(variableNameThatDoesntExist)
  }catch(error){
    error.status = 500;
    console.error(error.status)
    next(error)
  }
}
module.exports = errorController

  // try {

  //   ///for getting the error:
  //   const error = new Error("Internal Server Error")
  //   error.status = 500
  //   throw error
  // } catch (error) {
  //   next(error)
  // }
