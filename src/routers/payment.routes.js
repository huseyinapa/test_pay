const router = require("express").Router();
const { payment } = require("../controllers/payment.controller");

router.post("/payment", payment);

module.exports = router;
