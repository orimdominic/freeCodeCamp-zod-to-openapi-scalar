import { Router, raw } from "express";
import * as controller from "./controllers.ts";
import z from "zod";
import { bearerAuth, registry } from "../../lib/openapi.ts";
import {
  UserListItemSchema,
  UserSchema,
  UpdateUserSchema,
  CreateUserSchema,
} from "./types.ts";

const router = Router();

registry.registerPath({
  method: "post",
  path: "/api/users",
  summary: "Create user",
  tags: ["Users"],
  description: `*Use this API endpoint to create a user*`,
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateUserSchema,
        },
      },
      description: "Create user payload",
      required: true,
    },
  },
  responses: {
    201: {
      description: "User created",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({ example: "User created" }),
            data: UserSchema,
          }),
        },
      },
    },
  },
});
router.post("/", controller.createUser);

registry.registerPath({
  method: "get",
  path: "/api/users/{userId}",
  summary: "Get user details by id",
  tags: ["Users"],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    params: z.object({ userId: z.int() }),
  },
  responses: {
    200: {
      description: "User retrieved",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({ example: "User retrieved" }),
            data: UserSchema,
          }),
        },
      },
    },
  },
});
router.get("/:userId", controller.getUserById);

registry.registerPath({
  method: "get",
  path: "/api/users",
  summary: "Get paginated list of users",
  security: [{ [bearerAuth.name]: [] }],
  description: `_Authentication_`,
  tags: ["Users"],
  request: {
    query: z.object({ limit: z.string() }),
  },
  responses: {
    200: {
      description: "User list retrieved",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({ example: "Users retrieved" }),
            data: z.array(UserListItemSchema),
          }),
        },
      },
    },
  },
});
router.get("/", controller.listUsers);

registry.registerPath({
  method: "patch",
  path: "/api/users/{userId}",
  summary: "Update user details",
  tags: ["Users"],
  request: {
    params: z.object({ userId: z.int() }),
    body: {
      content: {
        "application/json": {
          schema: UpdateUserSchema,
        },
      },
      description: "Update user payload",
      required: true,
    },
  },
  responses: {
    200: {
      description: "User details updated",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({ example: "User details updated" }),
            data: z.null(),
          }),
        },
      },
    },
  },
});
router.patch("/:userId", controller.updateUser);

registry.registerPath({
  method: "put",
  path: "/api/users/{userId}/photo",
  summary: "Upload user photo",
  tags: ["Users"],
  request: {
    params: z.object({ userId: z.int() }),
    body: {
      content: {
        "multipart/form-data": {
          schema: z.object({
            image: z
              .string()
              .describe("The file to upload")
              .openapi({ format: "binary" }),
          }),
        },
      },
      description: "User photo (only jpeg, jpg and png allowed)",
      required: true,
    },
  },
  responses: {
    200: {
      description: "User photo updated",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({ example: "Photo uploaded" }),
            data: z.null(),
          }),
        },
      },
    },
  },
});
router.put(
  "/:userId/photo",
  raw({ type: "multipart/form-data" }),
  controller.setUserPhoto,
);

export default router;
