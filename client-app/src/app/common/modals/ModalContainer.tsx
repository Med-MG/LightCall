import { observer } from 'mobx-react-lite';
import React from 'react'
import { Modal } from 'react-bootstrap';
import { useStore } from '../../stores/Store';

    
const ModalContainer = () => {
    const {modalStore : {modal, closeModal}} = useStore();
    return (
        <Modal show={modal.open} onHide={closeModal}  >
            <Modal.Header closeButton>
                {/* <Modal.Title>Stack Trace</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
                {modal.body}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger" onClick={closeModal}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default observer(ModalContainer) 


