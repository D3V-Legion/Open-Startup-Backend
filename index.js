const express = require("express");
const morgan = require("morgan");

const userRoutes = require("./src/modules/users/usersRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "Open Startup es un proyecto innovador que promueve la transparencia y el crecimiento sostenible de las startups. Nuestra misión es hacer que el camino hacia el éxito sea accesible para todos."
    );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
