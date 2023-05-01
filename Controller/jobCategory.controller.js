const { JobCategoryModel } = require("../Model/jobCategory.model");
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
1
const upload = multer({ storage: storage }).single('image')


exports.getCategories = async (req, res) => {
  try {
    const categories = await JobCategoryModel.find({});
    res.send(categories);
  } catch (error) {
    res.send(error);
  }
};

exports.createCategory = async (req, res) => {
  const conflict = await JobCategoryModel.findOne({ name: req.body.name })

  upload(req, res, (err) => {
    if (err) return console.log(err)
    if (conflict) return res.status(409).send("This category registered");
    const categoryDoc = new JobCategoryModel({ name: req.body.name, photoUrl: req.file.filename });

    categoryDoc.save()
      .then(() => res.send(categoryDoc))
      .catch((err) => console.log(err))
  })

};
