const mongoose = require("mongoose");

const paymentShema = new mongoose.Schema(
  {
    sendData: {
      type: Object,
      required: true,
      trim: true,
    },
    resultData: {
      type: Object,
      required: true,
      trim: true,
    },
  },
  { collection: "payment_gulgonen", timestamps: true }
);

const payment = mongoose.model("payment_gulgonen", paymentShema);

module.exports = payment;
