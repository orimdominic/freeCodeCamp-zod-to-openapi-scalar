import { Router, raw } from "express";
import * as controller from "./controllers.ts";

const router = Router();

router.post("/", controller.createPet);


export default router;
