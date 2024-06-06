'use client'
import '@styles/profile-panel.scss';
import Button from '@components/button';

import { TailSpin } from 'react-loader-spinner';
import { updateUser } from '@/lib/actions';
import { UserInfo } from '@/lib/types';
import { useState } from 'react';
import { useFormState } from 'react-dom';



export default function ProfilePanel(
    {user}:
    {user: UserInfo}
){
    const [viewPassword, setViewPassword] = useState(false);
    const [edit, setEdit ] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateUserWithId = updateUser.bind(null, user.id);
    const [state, dispatch] = useFormState(updateUserWithId ,{
        message: null,
        errors: {
            name: [''],
            password: ['']
        }
    }
    );



    const handleFormState = () => {
        if(edit){
            setLoading(true);
        }
        else{
            setTimeout(() => {
                setEdit(!edit);
            }, 500);
        }
    };

    const handlePasswordInput = () => {
        setViewPassword(!viewPassword);
    }

    return (
        <div className='profile-panel'>
            <h2 className='profile-panel__header'>
                {
                    edit ? 'Edit Profile' : 'Profile'
                }
            </h2>
           
            <section className='profile-panel__menu'>
                {
                    loading &&
                    <TailSpin
                        height="100%"
                        width="100%"
                        color="gray"
                        ariaLabel="tail-spin-loading"
                        radius={1}
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                }
                <form 
                    className='profile-panel__form' 
                    action={dispatch}  
                    onSubmit={
                        () => handleFormState()
                    }
                    style={
                        {display: loading ? 'none' : 'block'}
                    }
                >
                    <div className='profile-panel__form-group'>
                        <label 
                            htmlFor='email'
                        >User</label>
                        <input 
                            className='no-text-decoration'
                            type='email' 
                            id='email' 
                            name='email' 
                            disabled={ true } 
                            value={ user.email }
                        />
                    </div>
                    <div className='profile-panel__form-group'>
                        <label 
                            htmlFor='name'
                        >Name</label>
                        <input 
                            type='text' 
                            id='name' 
                            name='name' 
                            disabled={ !edit } 
                            defaultValue={  user.name }
                            placeholder={ 'Enter new name'}
                        />
                        {
                            state.errors?.name && 
                            state.errors.name.length > 0 &&
                                <div className='profile-panel__error'>
                                    {
                                        state.errors.name.map((error, index) => (
                                            <p key={index}>{error}</p>
                                        ))
                                    }
                                </div>
                        }
                    </div>
                   
                    {
                        edit && 
 
                        <div className='profile-panel__form-group'>
                            <label htmlFor='password'>Password</label>
                            <input 
                                type={ viewPassword ? 'text' : 'password'} 
                                id='password' 
                                name='password' 
                                placeholder='New password'
                            />
                            <div className='profile-panel__view-password'>
                                <label 
                                    htmlFor='view-password' 
                                    className='profile-panel__view-password-label'
                                >View password</label>
                                <input 
                                    type='checkbox' 
                                    id='view-password' 
                                    className='' 
                                    onChange={ () => handlePasswordInput() }
                                />
                            </div>
                            {
                                state.errors?.password &&
                                state.errors.password.length > 0 &&
                                <div className='profile-panel__error'>
                                    {
                                        state.errors.password.map((error, index) => (
                                            <p key={index}>{error}</p>
                                        ))
                                    }
                                </div>
                            }
                        </div>

                    }
                    <Button 
                        disabled={ loading }
                        onClick={
                             !edit ? () => handleFormState() : () => {}
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