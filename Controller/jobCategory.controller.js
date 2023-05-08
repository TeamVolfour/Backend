const { JobCategoryModel } = require("../Model/jobCategory.model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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

const upload = multer({ storage: storage }).single("image");

exports.getCategories = async (req, res) => {
  try {
    const categories = await JobCategoryModel.find({});
    res.send(categories);
  } catch (error) {
    res.send(error);
  }
};

exports.createCategory = async (req, res) => {
  const conflict = await JobCategoryModel.findOne({ name: req.body.name });
  upload(req, res, (err) => {
    if (err) return console.log(err);
    if (conflict) return res.status(409).send("This category registered");
    const categoryDoc = new JobCategoryModel({
      name: req.body.name,
      photoUrl: fs.readFileSync(
        path.join(
          __dirname.substring(0, __dirname.lastIndexOf("/")) +
            "/Images/" +
            req.file.filename
        )
      ),
    });

    categoryDoc
      .save()
      .then(() => res.send(categoryDoc))
      .catch((err) => console.log(err));
  });
};
