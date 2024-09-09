const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const createUser = async (email, name, lastname, password) => {
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

module.exports = { createUser };
