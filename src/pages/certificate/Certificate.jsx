import React, {useContext, useEffect, useState} from 'react';
import CertificateService from "../../services/CertificateService";
import Loader from "../../components/UI/loader/Loader";
import {useFetching} from "../../hooks/useFetching";
import Input from "../../components/UI/input/Input";
import CertificatesList from "../../components/CertificatesList";
import Pagebar from "../../components/UI/pagination/Pagebar";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";

const Certificate = () => {

    const urlParams = new URLSearchParams(window.location.search)
    const paramPage = urlParams.get('page')
    const paramSize = urlParams.get('size')
    const paramSearchQuery = urlParams.get('search')
    const {store} = useContext(Context)


    const path = 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png'
    const [certificates, setCertificates] = useState([])
    const [size, setSize] = useState(paramSize !== null ? paramSize : 10)
    const [page, setPage] = useState(paramPage !== null ? paramPage : 0)
    const [searchQuery, setSearchQuery] = useState(paramSearchQuery !== null ? paramSearchQuery : '')
    const [amountOfPages, setAmountOfPages] = useState(0)
    const [fetchCertificate, isLoading, certificateError] = useFetching(store, async () => {
        const response = await CertificateService.getAll(page, size)
        setCertificates(response.data.content)
        setAmountOfPages(response.data.amountOfPages)
    })
    const navigate = useNavigate()

    const removeCertificate = (certificate) => {
        setCertificates(certificates.filter(p => p.id !== certificate.id))
    }

    useEffect(() => {
        fetchCertificate()
        if (searchQuery.length > 0) {
            navigate({
                pathname: '/certificates',
                search: `?page=${page}&size=${size}&search=${searchQuery}`
            })
        } else {
            navigate({
                pathname: '/certificates',
                search: `?page=${page}&size=${size}`
            })
        }
    }, [page, size, store.success, searchQuery])

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
export default observer(Certificate);