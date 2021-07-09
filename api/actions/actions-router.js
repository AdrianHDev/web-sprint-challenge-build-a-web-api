const Actions = require("./actions-model");
const express = require("express");
const { verifyProjectId } = require("../projects/projects-middleware");

// Write your "actions" router here!
const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      req.json(actions);
    })
    .catch(() => {
      next({ error: 500, message: "internal server error" });
    });
});

router.get("/:id", verifyProjectId, (req, res, next) => {
  Actions.get(req.params.id)
    .then((action) => {
      res.json(action);
    })
    .catch(() => {
      next({ error: 500, message: "internal server error" });
    });
});

router.post("/", (req, res, next) => {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    req
      .status(400)
      .json({
        message:
          "Please make sure you provide a project id, a description, and notes.",
      });
  } else {
    Actions.insert(req.body)
      .then((nAction) => {
        req.json(nAction);
      })
      .catch(() => {
        next({ error: 500, message: "internal server error" });
      });
  }
});
