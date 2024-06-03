import { signIn } from "next-auth/react";
import { UserInterface } from "./types";

export async function oAuth(type: string){
    const callbackUrl = "/chat";
    if(type === 'google'){
        await signIn("google", { 
            callbackUrl,
            redirect: false
         });
    }
    else if(type === 'github'){
        await signIn("github", { 
            callbackUrl,
            redirect: false
        });
    }
    else{
        
    }

}

export async function updateUser(user: UserInterface) {
    
}


