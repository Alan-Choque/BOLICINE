import Link from "next/link";

import { RegisterForm } from "./RegisterForm";
import { Terms } from "../components/Terms";

export default function RegisterPage() {
  return (
    <div>
      <p className="text-3xl font-bold text-left mb-7">Registro de usuario</p>

      <RegisterForm />

      <div className="mt-4 flex gap-2">
        <p className="text-white opacity-70">¿Ya tienes cuenta?</p>
        <Link href="/login" className="text-white hover:opacity-70">
          Inicia sesión aquí
        </Link>
      </div>

      <Terms />
    </div>
  );
}
