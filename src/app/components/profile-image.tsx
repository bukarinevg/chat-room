'use client';

import '@styles/profile-image.scss';
import React, { useRef, useState } from 'react';

export default function ProfileImage({id} : {id : string}){
    const [file, setFile] = useState('https://via.placeholder.com/150');

    function handleChange(e : React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.files);
        if (e.target.files && e.target.files[0]) {
            console.log(URL.createObjectURL(e.target.files[0]));
            setFile(URL.createObjectURL(e.target.files[0]));
        }
    }

    return(
        <div className='profile-image'>
            <form>
                <label  htmlFor={`fileInput${id}`}>
                    <img 
                        src={file}
                        alt='profile'
                        className='profile-image__img'
                    />
                </label>
                <input 
                    onChange={handleChange}
                    id={`fileInput${id}`}
                    type="file"  
                    className="profile-image__input"
                    style={{display: 'none'}}
                    accept="image/*"
                />
            </form>
        </div>
           
    )
}