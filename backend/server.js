require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/products");
const tabletRoutes = require("./routes/productTablets");
const powderRoutes = require("./routes/productPowders");
const userRoutes = require("./routes/user")

//express app
const app = express();

//global middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/capsules", productRoutes);
app.use("/api/tablets", tabletRoutes);
app.use("/api/powders", powderRoutes);
app.use("/api/user", userRoutes)
// app.use('/api/tablets',productRoutes)
// app.use('/api/powders',productRoutes)

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listenening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
