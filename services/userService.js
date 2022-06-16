const { User } = require("../models/models");


class UserService {
  async create(userDto, hashPassword) {
    const user = await User.create({ ...userDto, password: hashPassword });
    return user;
  }

  async getOneByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }
}

module.exports = new UserService();
