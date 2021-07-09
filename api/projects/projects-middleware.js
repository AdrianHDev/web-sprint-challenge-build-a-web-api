// add middlewares here related to projects
const { get } = require("./projects-model");

const verifyProjectId = (req, res, next) => {
  const id = req.params.id;
  get(id)
    .then((result) => {
      if (result) {
        next();
      } else {
        next({
          status: 404,
          message: "The server could not locate the resource.",
        });
      }
    })
    .catch(() => {
      next({ status: 500, message: "internal server error." });
    });
};

module.exports = {
  verifyProjectId,
};
