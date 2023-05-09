const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    var tempFileArr = file.originalname.split(".");
    var tempFileName = tempFileArr[0];
    var tempFileExtension = tempFileArr[1];

    cb(null, tempFileName + "-" + Date.now() + "." + tempFileExtension);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const acceptableExtensions = ["png", "jpg", "jpeg", "jpg"];
    if (
      !acceptableExtensions.some(
        (extension) =>
          path.extname(file.originalname).toLowerCase() === `.${extension}`
      )
    ) {
      return callback(
        new Error(
          `Extension not allowed, accepted extensions are ${acceptableExtensions.join(
            ","
          )}`
        )
      );
    }
    callback(null, true);
  },
}).single("image");

module.exports = { storage, upload };
