import { z } from "zod";

export const formSchema = z
  .object({
    nombre: z.string().min(1, "nombre requerido"),
    email: z.string().min(2, {
      message: "Email is too short",
    }),
    password: z.string().min(2, {
      message: "Email is too short",
    }),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "The passwords must match",
    path: ["repeatPassword"],
  });
