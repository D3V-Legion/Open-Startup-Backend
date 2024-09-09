const usersService = require("./usersService");
const {
  validateFields,
  validateEmail,
  validatePassword,
} = require("../../utils/validators");

const registerUser = async (req, res) => {
  // Destructure the email, name, lastname, and password fields from req.body
  const { email, name, lastname, password } = req.body;

  //#region Validate fields
  // Check if the fields are valid
  if (!validateFields(req.body)) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Check if the email is valid
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }
  // Check if the password is valid
  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "Password must be 8 characters long, and must contain at least one lowercase character, one uppercase character, and at least one number.",
    });
  }
  //#endregion

  // Call the createUser method from the usersService
  const result = await usersService.createUser(email, name, lastname, password);
  res
    .status(result.status)
    .json({ message: result.message, user: result.user });
};

module.exports = { registerUser };
