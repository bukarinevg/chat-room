'use client';
import { useFormState } from 'react-dom';
import Button from '@/app/ui/button';


export default function ChatForm(){
    return(
        <form className='room__form'>
            <input type="text" />
            <Button type="submit">Send</Button>
        </form>
    );
}