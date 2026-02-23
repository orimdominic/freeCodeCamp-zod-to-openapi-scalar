import { Router, raw } from "express";
import * as controller from "./controllers.ts";
import z from "zod";
import { registry } from "../../lib/openapi.ts";
import { CreatePetSchema, Pet } from "./types.ts";

const router = Router();

registry.registerPath({
  method: "post",
  path: "/api/pets",
  summary: "Create pet",
  tags: ["Pets"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreatePetSchema,
        },
      },
      description: "Create pet payload",
      required: true,
    },
  },
  responses: {
    201: {
      description: "Pet created",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({ example: "Pet created" }),
            data: Pet,
          }),
        },
      },
    },
  },
});
router.post("/", controller.createPet);

export default router;
