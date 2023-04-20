exports.jobMiddleware = (req, res, next) => {
  try {
    if (!req.body.title) {
      res.status(404).send("Please enter a job title");
    } else if (!req.body.content) {
      res.status(404).send("Please enter a information about the job");
    } else if (!req.body.deadline) {
      res.status(404).send("Please enter a deadline");
    } else if (!req.body.category) {
      res.status(404).send("Please pick a category");
    }
    next();
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};
