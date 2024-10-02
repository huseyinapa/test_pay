const router = require("express").Router();
const payment = require("./payment.routes");

router.use(payment);

module.exports = router;
