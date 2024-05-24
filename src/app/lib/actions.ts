import { signIn } from "next-auth/react";

export async function oAuth(type: string){
    const callbackUrl = "/room";
    if(type === 'google'){
        await signIn("google", { callbackUrl });
    }
    else if(type === 'github'){
        await signIn("github", { callbackUrl });
    }
    else{
        
    }

}


// export async function authenticate(
//     prevState: string | undefined,
//     formData: FormData,
//   ) {
//     try {
//       await signIn('credentials', formData);
//     } catch (error) {
//       if (error instanceof AuthError) {
//         switch (error.type) {
//           case 'CredentialsSignin':
//             return 'Invalid credentials.';
//           default:
//             return 'Something went wrong.';
//         }
//       }
//       throw error;
//     }
//   }

