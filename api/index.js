const express = require("express");
const mongoose = require("mongoose");

const app = express();

const router = require("./routes/user.routes");
const PORT = process.env.PORT || 5000;

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:4200",
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/groshy", router);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://siarhei:qwerty123@cluster0.bxsyh.mongodb.net/groshy?retryWrites=true&w=majority"
    );
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
