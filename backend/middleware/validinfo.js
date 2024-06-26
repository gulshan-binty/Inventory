// middleware/validinfo.js
module.exports = function (req, res, next) {
  const { email, name, password } = req.body;

  if (req.path === "/register") {
    if (![email, name, password].every(Boolean)) {
      return res.status(400).json("Missing Credentials");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(400).json("Missing Credentials");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json("Invalid Email");
    }
  }

  next();
};
