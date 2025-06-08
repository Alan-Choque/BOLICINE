// actions/login.ts
"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { signInSchema as LoginSchema } from "@/lib/zod";
import { db } from "@/lib/database";
import { RowDataPacket } from 'mysql2';
import { auth } from "@/auth"; // Asegúrate de importar auth aquí

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos." };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    const session = await auth();

    // Asegúrate de que el email esté disponible en la sesión
    if (!session?.user?.email) {
        return { error: "No se pudo obtener el email de usuario de la sesión." };
    }

    // --- Lógica para crear el perfil por defecto ---

    // 1. Obtener el `id_usuario` numérico de la tabla `usuarios` usando el email
    const [userRows] = await db.query<RowDataPacket[]>(
      `SELECT id_usuario FROM usuarios WHERE email = ? LIMIT 1`,
      [session.user.email]
    );

    const id_usuario = (userRows[0] as { id_usuario: number })?.id_usuario;

    if (!id_usuario) {
      console.error("DEBUG: No se encontró id_usuario en la base de datos para el email:", session.user.email);
      // Esto podría indicar que el usuario se autenticó con NextAuth pero no está registrado en tu tabla `usuarios`.
      // Si usas un sistema de registro donde el usuario primero se crea en `usuarios` y luego usa NextAuth,
      // este error significa que algo falló en el registro previo.
      // Si NextAuth es tu único punto de registro, necesitarías insertar el usuario aquí.
      return { error: "Usuario principal no encontrado en la base de datos." };
    }

    // 2. Contar cuántos perfiles tiene este usuario
    const [profileCountRows] = await db.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS count FROM perfiles WHERE id_usuario = ?`,
      [id_usuario]
    );

    const profileCount = (profileCountRows[0] as { count: number }).count;

    // 3. Si el usuario no tiene perfiles, crear uno por defecto
    if (profileCount === 0) {
      const defaultProfileName = session.user.name || "Mi Perfil";
      const defaultAvatarUrl = "/profiles/profile-4.png"; // ¡Asegúrate de que esta ruta exista en tu carpeta `public`!

      await db.query(
        `INSERT INTO perfiles (id_usuario, nombre_perfil, avatar_url) VALUES (?, ?, ?)`,
        [id_usuario, defaultProfileName, defaultAvatarUrl]
      );
      console.log(`DEBUG: Perfil por defecto creado para id_usuario: ${id_usuario}`);
    } else {
        console.log(`DEBUG: Usuario ${id_usuario} ya tiene ${profileCount} perfiles.`);
    }

    return { success: "¡Inicio de sesión exitoso!" };

  } catch (error) {
    console.error("Error en Server Action de login:", error);

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales inválidas." };
        case "OAuthSignInError":
          return { error: "Error al iniciar sesión con OAuth." };
        default:
          return { error: "Ocurrió un error inesperado al iniciar sesión." };
      }
    }
    return { error: "Ocurrió un error inesperado." };
  }
};