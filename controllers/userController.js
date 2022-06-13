const ErrorApi = require("../error/errorApi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ErrorApi.forbidden("Forbidden"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ErrorApi.badRequest("User exsist"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ErrorApi.unauthorized("User doesn't exist"));
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ErrorApi.forbidden("Password is not correct"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async checkAuth(req, res, next) {
    const { id, email, role } = req.query;
    const token = generateJwt(id, email, role);
    return res.json({ token });
  }
}

module.exports = new UserController();
