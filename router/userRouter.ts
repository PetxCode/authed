import { Router } from "express";
import {
  createUsers,
  getAllUsers,
  getOneUser,
  signInUsers,
  verifyUsers,
} from "../controller/userController";

const router: Router = Router();

router.route("/get-user/:userID").get(getOneUser);
router.route("/get-user").get(getAllUsers);

router.route("/create-user/").post(createUsers);
router.route("/sign-in-user/").post(signInUsers);

router.route("/verify-user/:userID").get(verifyUsers);

export default router;
