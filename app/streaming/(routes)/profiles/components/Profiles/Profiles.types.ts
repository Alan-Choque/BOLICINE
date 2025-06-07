export type UsuarioPerfil = {
    id_usuario: string;
    nombre: string;
    foto_perfil: string;
    mail: string; // Added mail field
};

export type ProfilesProps = {
    users: UsuarioPerfil[];
};
