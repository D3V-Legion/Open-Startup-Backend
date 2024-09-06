const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createUser = async (email, name, lastname, password) => {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        lastname,
        password,
      },
    });
    return { status: 201, message: "User created successfully", user };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports = { createUser };