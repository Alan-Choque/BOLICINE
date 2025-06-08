// app/api/usuarios/route.ts
import { auth } from "@/auth"; // Tu función `auth` de NextAuth.js
import { db } from "@/lib/database"; // Tu conexión a mysql2
import { NextResponse } from "next/server";
import { RowDataPacket } from 'mysql2'; // Para tipar las filas

export async function POST(req: Request) {
  const session = await auth(); // Obtenemos la sesión del usuario

  // Verificamos que el usuario esté autenticado y tenga un ID de sesión
  if (!session?.user || !session.user.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { profileName, avatarUrl } = await req.json();

  if (!profileName || !avatarUrl) {
    return new NextResponse("Invalid data", { status: 400 });
  }

  try {
    // 1. Obtener el `id_usuario` numérico de la tabla `usuarios`
    // (el que se vincula con la tabla `perfiles`)
    const [userRows] = await db.query<RowDataPacket[]>(
      // Asumo que tu tabla `usuarios` tiene una columna `id` que guarda el ID de NextAuth (string)
      `SELECT id_usuario FROM usuarios WHERE email = ? LIMIT 1`, 
      [session.user.email] 
    );

    const id_usuario = (userRows[0] as { id_usuario: number })?.id_usuario;

    if (!id_usuario) {
      console.error("No se encontró id_usuario en la base de datos para el email:", session.user.email);
      return new NextResponse("User ID not found in database", { status: 404 });
    }

    // 2. Verificar el límite de perfiles (máximo 5) para este `id_usuario`
    const [countRows] = await db.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS profileCount FROM perfiles WHERE id_usuario = ?`,
      [id_usuario]
    );

    const profileCount = (countRows[0] as { profileCount: number }).profileCount;

    if (profileCount >= 5) {
      return new NextResponse("Maximum 5 profiles allowed.", { status: 400 });
    }

    // 3. Crear el nuevo perfil en la tabla `perfiles`
    const [result] = await db.query(
      `INSERT INTO perfiles (id_usuario, nombre_perfil, avatar_url) VALUES (?, ?, ?)`,
      [id_usuario, profileName, avatarUrl]
    );

    // Obtener el ID del perfil recién insertado
    const newProfileId = (result as any).insertId; 

    // Opcional: Recuperar el perfil completo recién creado para la respuesta
    const [newProfileRows] = await db.query<RowDataPacket[]>(
        `SELECT id_perfil AS id, nombre_perfil AS profileName, avatar_url AS avatarUrl FROM perfiles WHERE id_perfil = ?`,
        [newProfileId]
    );
    const createdProfile = newProfileRows[0];

    return NextResponse.json(createdProfile);
  } catch (error) {
    console.error("Error al crear perfil:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Recibimos el `id` del perfil a eliminar (que es `id_perfil` en la DB)
  const { profileId } = await req.json(); 

  if (!profileId) {
    return new NextResponse("Profile ID is required", { status: 400 });
  }

  try {
    // 1. Obtener el `id_usuario` numérico del usuario autenticado
    const [userRows] = await db.query<RowDataPacket[]>(
      `SELECT id_usuario FROM usuarios WHERE email = ? LIMIT 1`,
      [session.user.email] 
    );

    const id_usuario = (userRows[0] as { id_usuario: number })?.id_usuario;

    if (!id_usuario) {
        console.error("No se encontró id_usuario en la base de datos para el email:", session.user.email);
        return new NextResponse("User ID not found", { status: 404 });
    }

    // 2. Verificar que el perfil a eliminar pertenezca al usuario autenticado
    const [profileCheckRows] = await db.query<RowDataPacket[]>(
      `SELECT id_perfil FROM perfiles WHERE id_perfil = ? AND id_usuario = ? LIMIT 1`,
      [profileId, id_usuario]
    );

    if (profileCheckRows.length === 0) {
        return new NextResponse("Profile not found or not authorized to delete.", { status: 403 });
    }

    // 3. Eliminar el perfil de la tabla `perfiles`
    await db.query(
      `DELETE FROM perfiles WHERE id_perfil = ?`,
      [profileId]
    );

    return NextResponse.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error al eliminar perfil:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}