const Actions = require('./actions-model')
// add middlewares here related to actions

const verifyActionById = (req, res, next) => {
    Actions.get(req.params.id).then(() => {
        next()
    }).catch(() => {
        next({status: 404, message: "The server could not locate said resource."})
    })
}