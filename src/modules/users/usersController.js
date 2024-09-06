const usersService = require("./usersService");
const { validateEmail, validatePassword } = require("../../utils/validators");

const registerUser = async (req, res) => {
  const { email, name, lastname, password } = req.body;
  if (!email || !name || !lastname || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!validatePassword(password)) {
    return res
      .status(400)
      .json({
        message:
          "Password must be 8 characters long, and must contain at least one lowercase character, one uppercase character, and at least one number.",
      });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }
  const result = await usersService.createUser(email, name, lastname, password);
  res.status(result.status).json(result.message);
};

module.exports = { registerUser };
