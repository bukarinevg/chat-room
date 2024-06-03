'use client'
import '@styles/profile-panel.scss';

import { useEffect, useState } from 'react';
import Button from './button';

export default function ProfilePanel(){
    const [edit, setEdit ] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);

    const handleFormState = () => {
        setTimeout(() => {
            setEdit(!edit);
        }, 500)
    };

    const handlePasswordInput = () => {
        setViewPassword(!viewPassword);
    }

    return (
        <div className='profile-panel'>
            <h1 className='profile-panel__header'>
                {
                    edit ? 'Edit Profile' : 'Profile'
                }
            </h1>
            <section className='profile-panel__menu'>
                <form className='profile-panel__form'>
                    <div className='profile-panel__form-group'>
                        <label 
                            htmlFor='name'
                        >Name</label>
                        <input 
                            type='text' 
                            id='name' 
                            name='name' 
                            disabled={ !edit } 
                            value={ 'name'}
                        />
                    </div>
                    <div 
                        style={
                            edit ? {overflow:'auto'} : {}
                        }
                        className='profile-panel__form-group'
                    >
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='email' 
                            id='email' 
                            name='email' 
                            disabled={ !edit }
                            value={ 'emaiaasddwasdsdsdl@mail.ru' }
                        />
                    </div>
                    
                    <div className='profile-panel__form-group'>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type='password' 
                            id='password' 
                            name='password' 
                            disabled={ !edit }
                            value={ 'password' }
                        />
                    </div>
                    <Button 
                        onClick={
                           () => handleFormState()
                        } 
                        className='profile-panel__form-button' 
                        type={
                            edit ? 'submit' : 'button'
                        }
                    >
                        {
                            edit ? 'Save' : 'Edit'
                        }
                    </Button>
                </form>
            </section>
        </div>
    );
}