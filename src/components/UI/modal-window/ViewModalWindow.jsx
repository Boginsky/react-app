import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import CertificatesList from "../../CertificatesList";

const ViewModalWindow = ({certificate}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="btn btn-primary btn-sm" onClick={handleShow}>
                View
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title>Certificate with id {certificate.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CertificatesList
                        certificates={[certificate]}
                    />
                </Modal.Body>
                <Modal.Footer style={{justifyContent: 'center'}}>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ViewModalWindow;