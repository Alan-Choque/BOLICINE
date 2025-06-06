// pages/profiles/page.tsx
import { db } from "@/lib/database"; // ya no prisma
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Profiles } from "./components/Profiles";
import { UsuarioPerfil } from "./components/Profiles/Profiles.types";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Consulta con mysql2
  const [rows] = await db.query(
    `SELECT id_usuario AS id, nombre AS profileName, foto_perfil AS avatarUrl 
      FROM usuario 
      WHERE email = ?`, 
    [session.user.email]
  );

  return (
    <div className="h-full flex flex-col justify-center items-center bg-zinc-900">
      <div>
        <h1 className="text-5xl mb-8">¿Quién eres? Elige tu perfil</h1>
      </div>

      <Profiles users={rows as UsuarioPerfil[]} />
    </div>
  );
}
