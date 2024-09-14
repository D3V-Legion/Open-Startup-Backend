const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const prisma = new PrismaClient();

const doesUserAlreadyExist = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user || false;
};
const userCreate = async (email, firstname, lastname, password) => {
  try {
    if (await doesUserAlreadyExist(email)) {
      return {
        status: 400,
        message: "User already exists",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        firstname,
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
        firstname: user.firstname,
        lastname: user.lastname,
        createadAt: user.createdAt,
      },
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

const userLogin = async (email, password) => {
  const user = await doesUserAlreadyExist(email);
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
  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "8h" });
  return {
    status: 200,
    message: "User logged in successfully",
    token,
  };
};

const getUserProfileByID = async (userId) => {
  try{
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
  });

  if (user) {
    return {
      status: 200,
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        createadAt: user.createdAt,
      },
    };
  }
} catch (error) {
  return {
    status: 500,
    message: error.message,
  };
}
};

module.exports = { userCreate, userLogin, getUserProfileByID };
