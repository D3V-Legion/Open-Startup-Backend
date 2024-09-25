//#region Initialize and configure the Express server

// Imports
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const morgan = require("morgan");

// Init express
const app = express();

// Configure middlewares
const prisma = new PrismaClient();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Test connection to PostgreSQL using Prisma
const testDBConnection = async () => {
  try {
    // Intentar una simple consulta para verificar la conexión
    await prisma.$connect();
    console.log("Successfully connected to PostgreSQL using Prisma.");
  } catch (error) {
    console.error("Failed to connect to PostgreSQL using Prisma:", error);
  } finally {
    // Cerrar la conexión después de la prueba
    await prisma.$disconnect();
  }
};
//#endregion

//#region Define and apply routes

// Import Routes
const userRoutes = require("./src/modules/users/usersRoutes");
const collaborationRoutes = require("./src/modules/collaboration/collaborationRoutes");
// Apply Routes
app.use("/", userRoutes);
app.use("/", collaborationRoutes);

// Default GET route
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "Open Startup es un proyecto innovador que promueve la transparencia y el crecimiento sostenible de las startups. Nuestra misión es hacer que el camino hacia el éxito sea accesible para todos."
    );
});
//#endregion

// Start server
app.listen(3000, () => {
  testDBConnection();
  console.log("Server is running on port 3000");
});
