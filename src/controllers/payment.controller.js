const { v4: uuidv4 } = require("uuid");
const Response = require("../utils/response");
const Iyzipay = require("iyzipay");
const paymentModel = require("../models/payment.model")

const id = uuidv4();
console.log(id);

const payment = async (req, res) => {

  var iyzipay = new Iyzipay({
    apiKey: "sandbox-wO0DfbWzp8qp8AO4sNuFvgvkLWmCn0IE",
    secretKey: "sandbox-3DFczG0UIeP15HEKQWV5Jvb3gObG5IvY",
    uri: "https://sandbox-api.iyzipay.com",
  });

  const { price, paymentCard, buyer, shippingAddress, billingAddress, basketItems } = req.body;

  const data = {
    locale: "tr",
    conversationId: id,
    price,
    paidPrice: price,
    currency: "TRY",
    installment: "1",
    paymentId: id + "1",
    paymentChannel: "WEB", // MOBIL
    paymentGroup: "PRODUCT",
    paymentCard,
    buyer,
    shippingAddress,
    billingAddress,
    basketItems,
  };

  //   console.log(data);

  return new Promise((resolve, reject) => {
    iyzipay.payment.create(data, async function (err, result) {
      console.log("data: ", data);
      console.log("result:", result);
      console.log("status:", result.status);

      await new paymentModel({
        sendData: data,
        resultData: result,
      }).save().catch((error) => console.log("error:", error));

      if (err)
        return resolve({
          custom: true,
          status: 300,
          errorMessage: result.errorMessage,
          result: result,
        });
      /*
            if (result.status === "failure") {
              return resolve(new Response({
                custom: true,
                status: 400,
                errorMessage: result.errorMessage,
                result: result,
              }).success(res));
            }
            if (result.status !== "success") {
              return resolve(new Response({
                custom: true,
                status: 400,
                errorMessage: result.errorMessage,
                result: result,
              }).success(res));
            }
      */

      //   console.log(result);

      return resolve(new Response(result, result.errorMessage).success(res));
    });
  });
};

module.exports = { payment };
