import React, {useState} from 'react';
import DeleteModalWindow from "./modal-window/DeleteModalWindow";
import ViewModalWindow from "./modal-window/ViewModalWindow";
import AddCertificatesModalWindow from "./modal-window/AddCertificatesModalWindow";
import {observer} from "mobx-react-lite";

const CertificateItem = ({certificates, certificate, remove}) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    return (
        <tr>
            <td>{certificate.createDate}</td>
            <td>{certificate.name}</td>
            <td>{certificate.tags.map((tag) => {
                return <div key={tag.id}>
                    {tag.text}
                </div>
            })}</td>
            <td>{certificate.description}</td>
            <td>{certificate.price}</td>
            {certificates.length > 1 &&
            <td>
                <ViewModalWindow
                    certificate={certificate}
                />
                <button onClick={handleShow} type="button" className="btn btn-warning btn-sm">Edit</button>
                <AddCertificatesModalWindow
                    show={show}
                    setShow={setShow}
                    certificate={certificate}

                />
                <DeleteModalWindow
                    certificate={certificate}
                    remove={remove}
                />
            </td>
            }
        </tr>
    );
};

export default CertificateItem;