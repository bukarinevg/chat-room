'use client';
import '@styles/chat-form.scss';
import Button from '@/components/button';
import { createMessage } from '@/lib/actions';
import pubnub from '@root/pubnub';

import { useSession } from 'next-auth/react';
import { useFormState } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ReactEventHandler, useState } from 'react';




export default function ChatForm(
    {chatId}:{chatId: number}
){
    const { data: session, status } = useSession();
    const userId = Number(session?.user.id);
    const initialState = {
        message: null,
        errors: {
            message: []
        }
    };
    
    const createChatWithUserId = createMessage.bind(null, userId, chatId);
    const[ state, dispatch ] = useFormState(createChatWithUserId, initialState);
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value);
    };

    const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
        setMessage('');
        
    };
    

    return(
        <div className='chat-form__area'>
            <form 
                className='chat-form'
                action={dispatch}
                onSubmit={handleSend}
                >
                <textarea 
                    onChange={handleChange}
                    name='message'
                    rows={1}  
                    value={message}
                 />

                <Button>
                    <FontAwesomeIcon icon={faPaperPlane} className='chat-form__icon' />
                </Button>
            </form>
           
                { 
                    state?.errors?.message &&
                    (
                        <span className='error'>
                            {
                                state.errors?.message.join(' ')
                            }
                        </span>
                    )
                }
        </div>        
    );
}