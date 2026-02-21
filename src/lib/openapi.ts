import z from "zod";
import {
  extendZodWithOpenApi,
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const registry = new OpenAPIRegistry();

export const bearerAuth = registry.registerComponent(
  "securitySchemes",
  "bearerAuth",
  {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  },
);

export function generateOpenAPIDocument() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.1.1",
    info: {
      title: "Users API",
      version: "1.0.0",
      description: `Backend API documentation for users application.`,
    },
    tags: [
      {
        name: "Users",
        description: `For operations carried out by users
## Heading
Sample documentation written with Markdown.
~strike-through~ text and *italicised* text is supported. **Bold** text too.

[Visit freeCodeCamp](https://freecodecamp.com)

![freeCodeCamp logo](https://upload.wikimedia.org/wikipedia/commons/3/39/FreeCodeCamp_logo.png?20191220141126)

\`\`\` js
console.log("freeCodeCamp!")
\`\`\``,
      },
      {
        name: "Pets",
        description: "For operations carried out for pets",
      },
    ],
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  });
}
