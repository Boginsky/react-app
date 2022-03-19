import React, {useEffect, useState} from 'react';
import CertificateService from "../../services/CertificateService";
import Loader from "../../components/UI/loader/Loader";
import {useFetching} from "../../hooks/useFetching";
import Input from "../../components/UI/input/Input";
import CertificatesList from "../../components/CertificatesList";
import Pagebar from "../../components/UI/pagination/Pagebar";
import {observer} from "mobx-react-lite";

const Certificate = () => {

    const path = 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png'
    const [certificates, setCertificates] = useState([])
    const [size, setSize] = useState(10)
    const [page, setPage] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [amountOfPages, setAmountOfPages] = useState(0)
    const [success,setSuccess] = useState(false)
    const [fetchCertificate, isLoading, certificateError] = useFetching(async () => {
        const response = await CertificateService.getAll(page, size)
        setCertificates(response.data.content)
        setAmountOfPages(response.data.amountOfPages)
    })


    const removeCertificate = (certificate) => {
        setCertificates(certificates.filter(p => p.id !== certificate.id))
    }

    useEffect(() => {
        fetchCertificate()
    }, [page, size,success])

    function hideErrorWindow() {
        let x = document.getElementById("errorTemplate")
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    return (
        <div className="container" style={{marginTop: 20, textAlign: "center"}}>
            {certificateError &&
            <div id='errorTemplate' className="alert alert-danger" role="alert">
                <img style={{maxBlockSize: 30}} src={path}/>
                <a>Ошибка: {certificateError}</a>
                <button onClick={hideErrorWindow} type="button" className="close" data-dismiss="alert"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            }
            <div>
                <Input
                    setSearchQuery={setSearchQuery}
                    placeholder="Search....."
                />
            </div>
            <hr/>

            {isLoading
                ? <div style={{display: 'flex', justifyContent: "center"}}>
                    <Loader/>
                </div>
                : <CertificatesList
                    searchQuery={searchQuery}
                    remove={removeCertificate}
                    certificates={certificates}
                    setCertificates={setCertificates}
                    setSuccess={setSuccess}
                />
            }
            <Pagebar
                amountOfPages={amountOfPages}
                setPage={setPage}
                size={size}
                setSize={setSize}
            />
        </div>
    );
};
export default observer (Certificate);