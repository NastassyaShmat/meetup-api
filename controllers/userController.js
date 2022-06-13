const ErrorApi = require("../error/errorApi")

class UserController {
  async registration(req, res) {}
  async login(req, res) {}
  async checkAuth(req, res, next) {
    const {id} = req.query
    if(!id){
      return next(ErrorApi.badRequest('ID is not found'))
    }
    res.json(id)
  }
}

module.exports = new UserController();
