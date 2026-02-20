import { Router } from "express";
import usersRouter from "./modules/users/router.ts";
import petsRouter from "./modules/pets/router.ts";

const router = Router();

router.use("/users", usersRouter);
router.use("/pets", petsRouter);

export default router;
