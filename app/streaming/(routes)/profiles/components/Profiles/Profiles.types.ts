export interface Perfil {
    id: number;
    profileName: string; // Corresponde a nombre_perfil
    avatarUrl: string | null;
};

export type ProfilesProps = {
    users: Perfil[];
};