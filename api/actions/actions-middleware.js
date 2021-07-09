const Actions = require('./actions-model')
// add middlewares here related to actions

const verifyActionById = (req, res, next) => {
    console.log("Verifying with ID", req.params.id)
    Actions.get(req.params.id).then((result) => {
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
    })
}

module.exports = verifyActionById;