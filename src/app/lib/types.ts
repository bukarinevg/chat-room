export type UserSesionInterface = {
    user: 
    { 
      id: string; 
      email: string; 
      name: string; 
    }; 
    expires: string; 
}

export type UserInfo = {
    id: number;
    email: string;
    name: string;
    password?: string;
}

