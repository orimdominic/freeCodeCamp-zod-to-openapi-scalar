import express from "express";
import router from "./router.ts";
import { generateOpenAPIDocument } from "./lib/openapi.ts";
import { apiReference } from "@scalar/express-api-reference";

const app = express();
app.use(express.json(), express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  return res.send("OK");
});

app.use("/api", router);

const apiDocJsonContent = generateOpenAPIDocument();
app.use(
  "/docs",
  apiReference({
    content: apiDocJsonContent,
    title: "Users API",
    pageTitle: "Users API",
  }),
);

export default app;
