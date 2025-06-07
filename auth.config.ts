import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { getUserByEmail } from "./data/user";
import { signInSchema } from "./lib/zod";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validated = signInSchema.safeParse(credentials);
        if (!validated.success) return null;

        const { email, password } = validated.data;
        const user = await getUserByEmail(email);

        if (!user || !user.password) return null;

        const match = await bcryptjs.compare(password, user.password);
        if (!match) return null;

        return {
          id: String(user.id_usuario), // 👈 importante: debe ser string
          email: user.email,
          name: user.nombre,
          image: user.foto_perfil || undefined,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
