export type UsuarioPerfil = {
    id_usuario: string;
    nombre: string;
    foto_perfil: string;
};

export type ProfilesProps = {
    users: UsuarioPerfil[];
};
