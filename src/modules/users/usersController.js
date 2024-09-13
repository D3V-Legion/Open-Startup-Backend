const usersService = require("./usersService");
const {
  validateUserLoginFields,
  validateUserRegisterFields,
  validateEmail,
  validatePassword,
} = require("../../utils/validators");

const handleUserRegister = async (req, res) => {
  // Destructure the email, name, lastname, and password fields from req.body
  const { email, name, lastname, password } = req.body;

  //#region Validate fields
  // Check if the fields are valid
  if (!validateUserRegisterFields(req.body)) {
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
  const result = await usersService.userCreate(email, name, lastname, password);
  res
    .status(result.status)
    .json({ message: result.message, user: result.user });
};

const handleUserLogin = async (req, res) => {
  // Destructure the email and password fields from req.body
  const { email, password } = req.body;

  //#region Validate fields
  // Check if the fields are valid
  if (!validateUserLoginFields(req.body)) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({ message: "Invalid password" });
  }
  //#endregion

  // Call the login method from the usersService
  const result = await usersService.userLogin(email, password);
  res
    .status(result.status)
    .json({ message: result.message, token: result.token || null });
};

const handleGetUserProfile = async (req, res) => {
  // Get the userId from the req object
  const userId = req.id;

  // Call the getUserById method from the usersService
  const user = await usersService.getUserProfileByID(userId);
  res.status(200).json(user);
}

module.exports = { handleUserRegister, handleUserLogin, handleGetUserProfile };
