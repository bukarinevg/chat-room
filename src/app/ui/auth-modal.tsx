import Modal from "@ui/modal";
import LoginForm from "@ui/login-form";
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