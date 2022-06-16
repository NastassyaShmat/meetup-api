const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorApi = require("../error/errorApi");

class AuthService {
  async registration(userDto) {
    const candidate = await userService.getOneByEmail(userDto.email);
    if (candidate) {
      throw new Error(`User with email ${userDto.email} has already existed`);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await userService.create(userDto, hashPassword);
    const token = this.generateJwt(user.id, user.email, user.role);
    return token;
  }

  async validateUser(email, password) {
    const user = await userService.getOneByEmail(email);
    if (!user) {
      throw new Error("User is not authorized");
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw new Error("Password is not correct");
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
