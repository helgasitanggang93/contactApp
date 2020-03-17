const router = require("express").Router();
const ImageController = require("../controllers/image");
const upload = require("../middlewares/images");
const uploadCsvMid = require("../middlewares/csv");
const { authenticationContact } = require("../middlewares/authentication");

router.post("/", upload.single("image"), ImageController.imageUpload);
router.post(
  "/csv",
  uploadCsvMid.single("csv"),
  authenticationContact,
  ImageController.csvUpload
);
module.exports = router;
