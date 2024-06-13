export interface ILogin {
  result: boolean;
}

export interface IRegistration {
  success?: boolean;
  error?: string;
}

export interface IProfile {
  email: string;
  favorites: string[];
  name: string;
  surname: string;
}

export type Profile = IProfile | null;
