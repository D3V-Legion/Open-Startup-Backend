const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createProject = async (title, description, userId) => {
  try {
    const project = await prisma.project.create({
      data: {
        title,
        description,
        ProjectUser: { create: { userId } },
      },
    });

    return { status: 201, message: "Project created successfully", project };
  } catch (err) {
    return { status: 500, message: "Internal server error" };
  }
};

module.exports = { createProject };
