import { Router, raw } from "express";
import * as controller from "./controllers.ts";

const router = Router();

router.post("/", controller.createUser);

router.get("/:userId", controller.getUserById);

router.get("/", controller.listUsers);

router.patch("/:userId", controller.updateUser);

router.put(
  "/:userId/photo",
  raw({ type: "multipart/form-data" }),
  controller.setUserPhoto,
);

export default router;
