import express from "express";
import router from "./router.ts";

const app = express();
app.use(express.json(), express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  return res.send("OK");
});

app.use("/api", router);

export default app;
