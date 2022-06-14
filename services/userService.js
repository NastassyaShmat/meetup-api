// const ErrorApi = require("../error/errorApi");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { User } = require("../models/models");
// const PayloadDto = require("../dto/payload");

// const generateToken = (payload) => {
//   return jwt.sign({ ...payload }, process.env.SECRET_KEY, {
//     expiresIn: "24h",
//   });
// };

// class UserService {
//   async regisration(userDto) {
// 	if (!userDto.email || !userDto.password) {
//         throw new Error("Forbidden");
//     }
//     const { email } = userDto;
//     const candidate = await User.findOne({ where: { email } });
//     if (candidate) {
//       return next(ErrorApi.badRequest("User exsist"));
//     }
//     const hashPassword = await bcrypt.hash(userDto.password, 5);
//     const user = await User.create({ ...userDto, password: hashPassword });
//     const userPayload = new PayloadDto(user);
//     const token = generateToken(userPayload);
//     return { token };
//   }
// }

// module.exports = new UserService();
