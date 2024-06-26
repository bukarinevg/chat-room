'use client';

import '@styles/profile-image.scss';
import logo from '@public/images/profile-default.jpg';
import React, { useContext, useRef, useState } from 'react';
import { updateProfileImage } from '@/lib/actions';
import { useFormState } from 'react-dom';
import Image from 'next/image'
import { LoadingContext } from '@components/providers/LoadingProvider';


export default  function ProfileImage({id, image} : {id : string, image:string|null}){
    if(image && !image.startsWith('http')){
        image= process.env.NEXT_PUBLIC_AWS_S3_URL + image;
    }
    const [file, setFile] = useState(image ?? logo);
    const {setLoading} = useContext(LoadingContext);

    const updateProfileImageWithIdAndPhoto = updateProfileImage.bind(null, id, image);
    const [state, dispatch] = useFormState(updateProfileImageWithIdAndPhoto, {});

    const imageForm = useRef<HTMLFormElement>(null);

    function handleChange(e : React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setFile(URL.createObjectURL(e.target.files[0])); 
            console.log('submitting');
            const submit = imageForm.current?.requestSubmit();
            setLoading(true); 
        }
    }


    return(
        <div  className='profile-image'>
            <div>
            <form action={dispatch} ref={imageForm} > 
                <label className='profile-image__label'  htmlFor={`fileInput${id}`}>
                    <Image
                        className='profile-image__img'
                        src={file}
                        alt="profile image"
                        width={120}
                        height={120}
                    />
                </label>
                <input 
                    onChange={handleChange}
                    id={`fileInput${id}`}
                    name='profileImage'
                    type="file"  
                    className="profile-image__input"
                    accept="image/*"
                />
            </form>
            </div>
        </div>
           
    )
}