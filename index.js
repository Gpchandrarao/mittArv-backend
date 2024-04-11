const exprerss = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes.js");
const recipeRoutes = require("./routes/recipe.js");

dotenv.config();
const app = exprerss();
const PORT = process.env.PORT || 6565;

app.use(cors());
app.use(exprerss.json());

mongoose
  .connect(process.env.MONGOO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at ${PORT} `);
    });
    console.log("mongoose connected");
  })
  .catch((error) => {
    console.log("error from Mongoose: " + error);
  });

app.get("/test", (req, res) => {
  console.log("hello");
});

app.use("/user", userRoutes);
app.use("/recips", recipeRoutes);
