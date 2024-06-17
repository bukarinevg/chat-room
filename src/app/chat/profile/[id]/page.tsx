import '@styles/profile.scss';
import ProfilePanel from '@/components/profile-panel';
import ProfileImage from '@components/profile-image';

import { UserInfo, UserSesionInterface } from '@/lib/types';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/lib/auth';
import { permanentRedirect } from 'next/navigation';
const prisma = new PrismaClient();

export default async function Page({ params }: { params: { id: string } }){
    
    const session: UserSesionInterface | null = await auth() as UserSesionInterface;
    const id = params.id;
    if(session.user.id !== id){
        permanentRedirect(session.user.id);
    }
    const userModel = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    if(! userModel ){ 
        return <div>User not found</div>
    }
    return(
        <div className='profile'>
            <ProfileImage id={id} image={userModel.image} />
            <ProfilePanel user={userModel as UserInfo} />
        </div>
    );
}