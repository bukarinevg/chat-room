import Modal from "@components/modal";
import LoginForm from "@components/login-form";
export default function AuthModal(
    {show, onClose}:  {
        show : boolean,
         onClose: () => void
    }){

    return (
        <Modal show={show} onClose={onClose} title="Login">
            <LoginForm />
        </Modal>
    );
}