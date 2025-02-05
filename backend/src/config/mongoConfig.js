import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => console.log(`Mongo Connected at ${res.connection.host}`))
  .catch((err) => console.log(err?.message));
