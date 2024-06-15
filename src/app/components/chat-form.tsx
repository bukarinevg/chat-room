'use client';
import '@styles/chat-form.scss';
import Button from '@/components/button';
import { createMessage } from '@/lib/actions';

import { useSession } from 'next-auth/react';
import { useFormState } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';




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

    return(
        <div className='chat-form__area'>
            <form 
                className='chat-form'
                action={dispatch}
                >
                <textarea 
                    name='message'
                    rows={1}  
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