'use client';
import '@styles/chat-form.scss';
import Button from '@/components/button';
import { createMessage } from '@/lib/actions';
import pubnub from '@root/pubnub';

import { useSession } from 'next-auth/react';
import { useFormState } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ReactEventHandler, useState, useRef } from 'react';




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
    const chatForm = useRef<HTMLFormElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value);
    };

    const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
        setMessage('');
        
    };

    const dragEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault();
            const submit = chatForm.current?.requestSubmit();
        }
    }
    

    return(
        <div className='chat-form__area'>
            <form 
                className='chat-form'
                action={dispatch}
                onSubmit={handleSend}
                ref={chatForm}
                >
                <textarea 
                    onKeyDown={dragEnter}
                    onChange={handleChange}
                    name='message'
                    rows={1}  
                    value={message}
                 />

                <div >
                    <Button >
                        <FontAwesomeIcon  icon={faPaperPlane} className='chat-form__icon' />
                    </Button>
                </div>

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

