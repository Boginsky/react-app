import React, {useContext, useState} from 'react';
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import AddCertificatesModalWindow from "../modal-window/AddCertificatesModalWindow";

const CustomNavBar = () => {
    const {store} = useContext(Context)
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);


    return (
        <nav className="navbar navbar-dark bg-dark justify-content-md-between">
            <span className="navbar-brand mb-0 h1"> {store.isAuth
                ? <>
                    Admin UI
                    <button style={{marginLeft: 10}}
                            type="button"
                            className="btn btn-primary btn-sm" onClick={handleShow}>
                        Add new
                    </button>
                    <AddCertificatesModalWindow
                        show={show}
                        setShow={setShow}/>
                </>
                : "Авторизуйтесь"
            }
            </span>
            {store.isAuth
                ? <div>
                    <span style={{color: 'white', marginRight: 10}}>User: {localStorage.getItem('username')}</span>
                    <button
                        onClick={() =>
                            store.logout()
                        }
                        type="button"
                        className="btn btn-secondary btn-sm">Logout
                    </button>
                </div>
                : ""}
        </nav>
    );
};

export default observer(CustomNavBar);