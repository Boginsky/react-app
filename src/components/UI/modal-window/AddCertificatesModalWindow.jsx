import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import Tag from "../tag/Tag";
import CertificateService from "../../../services/CertificateService";
import {observer} from "mobx-react-lite";

const AddCertificatesModalWindow = ({show, setShow, certificate}) => {
    const [certificateError, setCertificateError] = useState('')
    const [certificateSuccess, setCertificateSuccess] = useState('')
    const handleClose = () => setShow(false);

    const handleAdd = async (e) => {
        e.preventDefault()
        try {
            setCertificateSuccess('')
            setCertificateError('')
            await CertificateService.create({
                "name": name,
                "description": description,
                "price": price,
                "duration": duration,
                "tags": tags
            })
            setCertificateSuccess('Success')
        } catch (e) {
            setCertificateError('Something went wrong')
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        try {
            setCertificateSuccess('')
            setCertificateError('')
            await CertificateService.update(certificate.id, {
                "name": name,
                "description": description,
                "price": price,
                "duration": duration,
                "tags": tags

            })
            setCertificateSuccess('Success')
        } catch (e) {
            setCertificateError('Something went wrong')
        }
    }

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(1)
    const [duration, setDuration] = useState(1)
    const [tags, setTags] = useState([])
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header style={{backgroundColor: "lightgrey"}}>
                    <Modal.Title>{certificate === undefined ? 'Add new certificate' : 'Edit certificate with id: ' + certificate.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {certificateError !== '' && certificateSuccess === ''
                        ? <div id='errorTemplate' className="alert alert-danger" role="alert">
                            <a>Error: {certificateError}</a>
                        </div>
                        : ''
                    }
                    {certificateSuccess !== '' && certificateError === ''
                        ? <div id='errorTemplate' className="alert alert-success" role="alert">
                            <a>{certificate === undefined ? 'Success: Certificate added' : 'Success: Certificate edited'}</a>
                        </div>
                        : ''
                    }
                    <form>
                        <div className="form-group row">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Title:</label>
                            <div className="col-sm-10">
                                <input onChange={e => setName(e.target.value)} type="text" className="form-control"
                                       placeholder={certificate === undefined ? 'Title' : certificate.name}
                                       minLength={6} maxLength={30}
                                />
                                {certificateError !== '' && certificateSuccess === '' ?
                                    <small id="passwordHelp" className="text-danger">
                                        Must be 6-30 characters long.
                                    </small>
                                    : ''}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="text" className="col-sm-2 col-form-label">Description:</label>
                            <div className="col-sm-10">
                                <textarea onChange={e => setDescription(e.target.value)} className="form-control"
                                          rows="3"
                                          placeholder={certificate === undefined ? 'Description' : certificate.description}
                                          minLength={12} maxLength={1000}
                                />
                                {certificateError !== '' && certificateSuccess === '' ?
                                    <small id="passwordHelp" className="text-danger">
                                        Must be 12-1000 characters long.
                                    </small>
                                    : ''}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Duration:</label>
                            <div className="col-sm-10">
                                <input onChange={e => setDuration(e.target.value)} type="number"
                                       className="form-control"
                                       placeholder={certificate === undefined ? 'Duration' : certificate.duration}
                                       min={0}
                                />
                                {certificateError !== '' && certificateSuccess === '' ?
                                    <small id="passwordHelp" className="text-danger">
                                        Must be positive
                                    </small>
                                    : ''}
                            </div>
                        </div>
                        <div className="form-group row w-auto">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Price:</label>
                            <div className="col-sm-10">
                                <input onChange={e => setPrice(e.target.value)} type="number" className="form-control"
                                       placeholder={certificate === undefined ? 'Price' : certificate.price}
                                       min={0}/>
                                {certificateError !== '' && certificateSuccess === '' ?
                                    <small id="passwordHelp" className="text-danger">
                                        Must be positive
                                    </small>
                                    : ''}
                            </div>
                        </div>
                        <Tag
                            tags={tags}
                            setTags={setTags}
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer style={{justifyContent: 'center'}}>
                    <Button onClick={certificate === undefined ? handleAdd : handleEdit} type="submit"
                            variant="primary">
                        Save
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddCertificatesModalWindow;