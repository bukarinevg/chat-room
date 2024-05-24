'use client';
import '@styles/chat-form.scss';
import Button from '@/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


export default function ChatForm(){
    return(
        <form className='chat-form'>
            <textarea rows={1}   />
            <Button>
                <FontAwesomeIcon icon={faPaperPlane} className='chat-form__icon' />
            </Button>
        </form>
    );
}