import { z } from "zod";

export const Pet = z.object({
  id: z.int(),
  name: z.string(),
  category: z.object({
    id: z.int(),
    name: z.string(),
  }),
  photoUrls: z.array(z.string()),
  tags: z.array(
    z.object({
      id: z.int(),
      name: z.string(),
    }),
  ),
  status: z.enum(["available", "unavailable"]),
});
