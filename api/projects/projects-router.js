const express = require("express");
const Projects = require("./projects-model");
// Write your "projects" router here!
const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch(() => {
      next({ status: 500, message: "Unknown error occured." });
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Projects.get(id)
    .then((project) => {
      res.json(project);
    })
    .catch(() => {
      next({ status: 500, message: "Unknown error occured." });
    });
});

router.post("/", (req, res, next) => {
  if (!req.body.name || !req.body.description) {
    res
      .status(400)
      .json({
        message: "You failed to provide a name or description for this project",
      });
  } else {
    Projects.insert(req.body)
      .then((newProj) => {
        console.log(newProj)
        res.status(201).json(newProj);
      })
      .catch((error) => {
        console.log(error)
        next({ status: 500, message: "Unknown error occured." });
      });
  }
});

router.put("/:id", (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then((updProj) => {
      res.json(updProj);
    })
    .catch(() => {
      next({ status: 500, message: "Unknown error occured." });
    });
});

router.delete("/:id", (req, res, next) => {
  Projects.remove(req.params.id)
    .then((delProj) => {
      res.json(delProj);
    })
    .catch(() => {
      next({ status: 500, message: "Unknown error occured." });
    });
});

router.get("/:id/actions", (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((projActions) => {
      res.json(projActions);
    })
    .catch(() => {
      next({ status: 500, message: "Unknown error occured." });
    });
});

module.exports = router;
