import express from "express";

// Middleware
import Middlewares from "../middlewares";

// Controllers
import DevController from "../controllers/DevController";
import SourceController from "../controllers/SourceController";
import UserController from "../controllers/UserController";
import FollowerController from "../controllers/FollowerController";

const router = express.Router();

router.route("/").get((req, res, next) => {
  return res.json({ message: "OK! Request accept" });
});

router
  .route("/devs")
  .post(
    (req, res, next) => {
      const newTechs = Middlewares.mapTech(req, res);
      const location = Middlewares.defineLocation(req, res);

      req.body.newTechs = newTechs;
      req.body.location = location;

      next();
    },
    DevController.show,
    DevController.store
  )
  .get(DevController.index);

router.route("/search").get((req, res, next) => {
  const newTechs = Middlewares.mapTech(req, res);
  req.query.newTechs = newTechs;
  next();
}, SourceController.index);

router
  .route("/user")
  .post(UserController.store)
  .get(UserController.show)
  .delete()
  .put(UserController.update);

router.route("/follower").post(FollowerController.store);

router.route("/follower/unfollowing").delete(FollowerController.delete);

export default router;
