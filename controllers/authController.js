const ErrorApi = require("../error/errorApi");
const UserDto = require("../dto/userDto");
const { validationResult } = require("express-validator");
const authService = require("../services/authService");

class AuthController {
  async registration(req, res, next) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        next(ErrorApi.badRequest("Validation error", validationErrors.array()));
      }
      const userDto = new UserDto(req.body);
      const token = await authService.registration(userDto);
      return res.json({ token });
    } catch (e) {
      next(e);
    }
  }

  // async checkAuth(req, res, next) {
  //   try {
  //     const { id, email, role } = req.query;
  //     const token = generateJwt(id, email, role);
  //     return res.json({ token });
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

module.exports = new AuthController();
