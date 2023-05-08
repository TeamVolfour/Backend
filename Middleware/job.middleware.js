exports.jobMiddleware = (req, res, next) => {


  try {
    console.log(req.body, 'job post')

    if (!req.body.title) {
      return res.status(404).send("Please enter a job title");
    } else if (!req.body.content) {
      return res.status(404).send("Please enter a information about the job");
    } else if (!req.body.employerEmail) {
      return res.status(404).send("Please enter employer email");
    } else if (!req.body.deadline) {
      return res.status(404).send("Please enter a deadline");
    } else if (!req.body.category) {
      return res.status(404).send("Please pick a category");
    } else if (!req.body.creator) {
      return res.status(404).send("Insert creator credentials");
    }
    next();
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};
