const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
