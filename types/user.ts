// types/user.ts
export interface Usuario {
  id_usuario: number;
  nombre: string;
  email: string;
  password: string;
  rol: string;
  fecha_registro: Date;
  bloqueado_hasta: Date | null;
  foto_perfil: string | null;
  verificado: boolean;
}
