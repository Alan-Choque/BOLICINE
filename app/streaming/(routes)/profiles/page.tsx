// pages/profiles/page.tsx
import { db } from "@/lib/database"; // ya no prisma
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Profiles } from "./components/Profiles";
import { Perfil } from "./components/Profiles/Profiles.types";
import { RowDataPacket } from 'mysql2';



export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/streaming/login");
  }

  // Consulta con mysql2
  let userProfiles: Perfil[] = []; 

  try {
    // 1. Obtener el `id_usuario` numérico de la tabla `usuarios`
    const [userRows] = await db.query<RowDataPacket[]>(
      // Asumo que tu tabla `usuarios` tiene una columna `id` que guarda el ID de NextAuth (string)
      `SELECT id_usuario FROM usuarios WHERE email = ? LIMIT 1`, 
      [session.user.email] 
    );

    const id_usuario = (userRows[0] as { id_usuario: number })?.id_usuario;

    if (!id_usuario) {
        console.error("No se encontró id_usuario para el usuario autenticado (email):", session.user.email);
        redirect("/streaming/login"); // Si no encontramos el ID de usuario, redirigimos.
    }

    // 2. Consulta la tabla `perfiles` para obtener los perfiles asociados a ese `id_usuario`
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT id_perfil AS id, nombre_perfil AS profileName, avatar_url AS avatarUrl
        FROM perfiles
        WHERE id_usuario = ?`,
      [id_usuario] 
    );

    // Mapea los resultados de la base de datos a tu tipo `Perfil`
    userProfiles = rows.map(row => ({
      id: row.id,
      profileName: row.profileName,
      avatarUrl: row.avatarUrl,
      // Si el componente `Profiles` necesita el `userId` de NextAuth, lo añades aquí
      // userId: session.user!.id 
    }));

  } catch (error) {
    console.error("Error al obtener perfiles de usuario desde MySQL:", error);
    redirect("/error-loading-profiles"); // Redirige a una página de error o muestra un mensaje
  }

  return (
    <div className="h-full flex flex-col justify-center items-center bg-zinc-900">
      <div>
        <h1 className="text-5xl mb-8">¿Quién eres? Elige tu perfil</h1>
      </div>

      <Profiles users={userProfiles} />
    </div>
  );
}
