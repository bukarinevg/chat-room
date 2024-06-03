export interface UserSesionInterface{
    user: 
    { 
      id: string; 
      email: string; 
      name: string; 
    }; 
    expires: string; 
}

export interface UserInterface{
    id: string;
    email: string;
    name: string;
    password: string;
}