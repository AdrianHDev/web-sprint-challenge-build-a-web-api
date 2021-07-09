const Actions = require("./actions-model");
const express = require("express");
const verifyActionById = require("./actions-middleware");

// Write your "actions" router here!
const actionsRouter = express.Router();

actionsRouter.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      req.json(actions);
    })
    .catch(() => {
      next({ error: 500, message: "internal server error" });
    });
});

actionsRouter.get("/:id", verifyActionById, (req, res, next) => {
  Actions.get(req.params.id)
    .then((action) => {
      res.json(action);
    })
    .catch(() => {
      next({ error: 500, message: "internal server error" });
    });
});

actionsRouter.post("/", (req, res, next) => {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({
      message:
        "Please make sure you provide a project id, a description, and notes.",
    });
  } else {
    Actions.insert(req.body)
      .then((nAction) => {
        res.json(nAction);
      })
      .catch(() => {
        next({ error: 500, message: "internal server error" });
      });
  }
});

actionsRouter.put("/:id", verifyActionById, (req, res, next) => {
  if (
    !req.body.id ||
    !req.body.project_id ||
    !req.body.description ||
    !req.body.notes ||
    !req.body.completed
  ) {
    next({ status: 400, message: "Missing required paramaters" });
  } else {
    Actions.update(req.params.id, req.body)
      .then((updated) => {
        res.json(updated);
      })
      .catch(() => {
        next({ error: 500, message: "internal server error" });
      });
  }
});

actionsRouter.delete("/:id", verifyActionById, (req, res, next) => {
  Actions.remove(req.params.id)
    .then(() => {
      res.json();
    })
    .catch(() => {
      next({ error: 500, message: "internal server error" });
    });
});
module.exports = actionsRouter;
