const mongoose = require("mongoose");
const slideSchema = require("./Slide");

const presentationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    authors: [String],
    slides: [slideSchema], //Embedded Document Pattern, data that’s regularly accessed together
  },
  {
    timestamps: true, // mongoDB will auto generate createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Presentation", presentationSchema);
