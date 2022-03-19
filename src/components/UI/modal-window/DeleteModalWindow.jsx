import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import CertificateService from "../../../services/CertificateService";

const DeleteModalWindow = ({remove, certificate}) => {
    const [show, setShow] = useState(false);

    const handleCloseAndDelete = (e) => {
        e.preventDefault()
        CertificateService.delete(certificate.id)
        remove(certificate)
        setShow(false);
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="btn btn-danger btn-sm" onClick={handleShow}>
                Delete
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title>Delete confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete certificate with id = {certificate.id}</Modal.Body>
                <Modal.Footer style={{justifyContent: 'center'}}>
                    <Button variant="danger" onClick={handleCloseAndDelete}>
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteModalWindow;