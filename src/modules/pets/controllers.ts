import { faker as fk } from "@faker-js/faker";

import type { Request, Response } from "express";

export function createPet(req: Request, res: Response) {
  return res.status(201).json({
    message: "Pet created",
    data: {
      id: fk.number.int(),
      name: fk.person.fullName(),
      category: {
        id: fk.number.int(),
        name: fk.animal.type(),
      },
      photoUrls: new Array(3).fill(0).map(() => fk.image.urlPicsumPhotos()),
      tags: new Array(3).fill(0).map(() => ({
        id: fk.number.int(),
        name: fk.lorem.slug(),
      })),
      status: fk.helpers.arrayElement(["available", "unavailable"]),
    },
  });
}
