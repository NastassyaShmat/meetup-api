const jwt = require('jsonwebtoken')

module.exports = function (role) {
	return function (req, res, next) {
		try {
		  const token = req.headers.authorization.split(" ")[1];
		  if (!token) {
			return res.status(401).json({ message: "User is not authorized" });
		  }
		  const decoded = jwt.verify(token, process.env.SECRET_KEY);
		  if(decoded.role !== role){
			return res.status(403).json({ message: "Forbidden for your role" });
		  }
		  res.user = decoded;
		  next();
		} catch (e) {
		  res.status(401).json({ message: "User is not authorized" });
		}
	  };
};