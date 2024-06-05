import '@styles/profile.scss';
import ProfilePanel from '@/components/profile-panel';
import ProfileImage from '@components/profile-image';

import { UserInfo } from '@/lib/types';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function Page({ params }: { params: { id: string } }){
    const id = params.id;
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
            <ProfileImage id={id} />
            <ProfilePanel user={userModel as UserInfo} />
        </div>
    );
}