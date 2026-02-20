import app from "./app.ts";
import { createServer } from "http";

function main() {
  const server = createServer(app);
  server.listen(3000, function () {
    console.log("Listening on :3000");
  });
}

main();
