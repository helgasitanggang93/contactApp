const router = require("express").Router();
const userRoute = require("./user");
const contactRoute = require("./contact");
const imageRoute = require("./images");

router.use("/users", userRoute);
router.use("/contacts", contactRoute);
router.use("/upload", imageRoute);

module.exports = router;
