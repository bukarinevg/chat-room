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
    image?: string;
    password?: string;
}

export type UserDetails = {
  id: number;
  email: string;
  name: string;
  image?: string;
}
