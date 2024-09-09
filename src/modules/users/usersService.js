const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const prisma = new PrismaClient();

const userCreate = async (email, name, lastname, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        lastname,
        password: hashedPassword,
      },
    });
    return {
      status: 201,
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        createadAt: user.createdAt,
      },
    };
  } catch (error) {
    return {
      status: 500,
      message: "This email is already registered",
    };
  }
};

const userLogin = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return {
      status: 404,
      message: "User not found",
    };
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return {
      status: 401,
      message: "Invalid password",
    };
  }
  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "8h" });
  return {
    status: 200,
    message: "User logged in successfully",
    token,
  };
};

module.exports = { userCreate, userLogin };
