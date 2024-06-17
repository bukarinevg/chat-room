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
  image?: string|null;
}

export type Chat = {
    id: number;
    name: string;
    private : boolean;
    ownerId: number;
    users?: UserDetails[];
    messages?: Message[];
}

export type Message = {
  id: number,
  text: string,
  userId: number,
  user?: {
      id: number,
      name: string,
      image: string | null,
  },
  createdAt: Date ,
}