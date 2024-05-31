import Modal from "@ui/modal";
export default function AuthModal(
    {show, onClose}:  {
        show : boolean,
         onClose: () => void
    }){

    return (
        <Modal show={show} onClose={onClose} title="Authorize">
            <h2>Please Log In</h2>
            <p>You must be logged in to access this content.</p>
        </Modal>
    );
}