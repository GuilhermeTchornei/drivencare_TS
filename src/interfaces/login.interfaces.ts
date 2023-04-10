export enum Type {
    Doctor = 'doctor',
    Patient = 'patient'
};

export interface Login {
    email: string,
    password: string,
    type: Type
};

export interface AuthUser {
    id: number,
    type: Type
};