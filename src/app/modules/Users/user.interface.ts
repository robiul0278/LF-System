export type TUpdateProfile = {
    bio: string;
    age: number;
}


interface Profile {
    bio: string;
    age: number;
}

export type TUseRegister = {
    name: string;
    email: string;
    password: string;
    profile: Profile;
}
