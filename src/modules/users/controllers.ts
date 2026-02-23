import { faker as fk } from "@faker-js/faker";

import type { Request, Response } from "express";

export function createUser(req: Request, res: Response) {
  return res.status(201).json({
    message: "User created",
    data: {
      id: fk.number.int(),
      name: fk.person.fullName(),
      dob: fk.date.past(),
      marital: fk.helpers.arrayElement(["single", "married", "divorced"]),
      canDrive: fk.helpers.arrayElement([true, false]),
      numOfCars: fk.number.int({ min: 1, max: 3 }),
      cars: Array(fk.number.int({ min: 3, max: 5 }))
        .fill(0)
        .map(() => fk.word.noun()),
      address: {
        state: fk.location.state(),
        locality: fk.location.city(),
        street: fk.location.street(),
        houseNumber: fk.number.int({ min: 1 }),
      },
    },
  });
}

export function getUserById(req: Request, res: Response) {
  return res.json({
    message: "User retrieved",
    data: {
      id: parseInt(`${req.params.userId}`),
      name: fk.person.fullName(),
      dob: fk.date.past(),
      marital: fk.helpers.arrayElement(["single", "married", "divorced"]),
      canDrive: fk.helpers.arrayElement([true, false]),
      numOfCars: fk.number.int({ min: 1, max: 3 }),
      cars: Array(fk.number.int({ min: 3, max: 5 }))
        .fill(0)
        .map(() => fk.word.noun()),
      address: {
        state: fk.location.state(),
        locality: fk.location.city(),
        street: fk.location.street(),
        houseNumber: fk.number.int({ min: 1 }),
      },
    },
  });
}

export function listUsers(req: Request, res: Response) {
  return res.json({
    message: "Users retrieved",
    data: {
      docs: Array(3)
        .fill(0)
        .map(() => ({
          id: fk.number.int({ min: 0 }),
          name: fk.person.fullName(),
          dob: fk.date.past(),
          marital: fk.helpers.arrayElement(["single", "married", "divorced"]),
          canDrive: fk.helpers.arrayElement([true, false]),
          numOfCars: fk.number.int({ min: 1, max: 3 }),
          cars: Array(fk.number.int({ min: 3, max: 5 }))
            .fill(0)
            .map(() => fk.word.noun()),
          address: {
            state: fk.location.state(),
            locality: fk.location.city(),
            street: fk.location.street(),
            houseNumber: fk.number.int({ min: 1 }),
          },
        })),
    },
  });
}

export function updateUser(req: Request, res: Response) {
  return res.json({
    message: "User details updated",
    data: null,
  });
}

export function setUserPhoto(req: Request, res: Response) {
  return res.json({
    message: "Photo uploaded",
    data: { contentType: req.headers["content-type"] },
  });
}
