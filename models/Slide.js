const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  content: String,
  // additional slide parameters if needed
});

module.exports = slideSchema;
