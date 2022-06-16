const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorApi = require("../error/errorApi");

class AuthService {
  async registration(userDto) {
    const candidate = await userService.getOneByEmail(userDto.email);
    if (candidate) {
      const token = this.chekPassword(candidate, userDto.password);
      return token;
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await userService.create(userDto, hashPassword);
    const token = this.generateJwt(user.id, user.email, user.role);
    return token;
  }

  async chekPassword(user, password) {
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return ErrorApi.forbidden("Password is not correct");
    }
    const token = this.generateJwt(user.id, user.email, user.role);
    return token;
  }

  generateJwt = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
  };
}

module.exports = new AuthService();
