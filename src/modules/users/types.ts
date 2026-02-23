import { z } from "zod";

const User = z.object({
  id: z.int(),
  name: z.string().trim().min(3).optional(),
  dob: z.coerce.date().openapi({ description: "The date of birth" }),
  marital: z.enum(["single", "married", "divorced"]),
  canDrive: z.boolean(),
  numOfCars: z.int().max(3).min(1),
  cars: z.array(z.string().trim().min(3)).min(1).max(5),
  address: z.object({
    state: z.string().trim().min(3),
    locality: z.string().trim().min(3),
    street: z.string().trim().min(3),
    houseNumber: z.int().min(1),
  }),
});

export const UserSchema = User.clone();

export const CreateUserSchema = User.clone().omit({ id: true });

export const UpdateUserSchema = UserSchema.clone().omit({ id: true });

export const UserListItemSchema = z.object({
  id: z.int(),
  name: z.string().trim().min(3),
  marital: z.enum(["single", "married", "divorced"]),
  canDrive: z.boolean(),
  numOfCars: z.int(),
});
