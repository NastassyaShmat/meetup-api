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
      next(ErrorApi.badRequest(e.message));
    }
  }

  async login(req, res, next) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        next(ErrorApi.badRequest("Validation error", validationErrors.array()));
      }
      const { email, password } = req.body;
      const token = await authService.validateUser(email, password);
      return res.json({ token });
    } catch (e) {
      next(ErrorApi.forbidden(e.message));
    }
  }

}

module.exports = new AuthController();
