export interface Perfil {
    id: number;
    profileName: string;
    avatarUrl: string | null;
};

export type ProfilesProps = {
    users: Perfil[];
};