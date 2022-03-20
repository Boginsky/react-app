import React, {useContext} from 'react';
import Login from "../pages/login/Login";
import {Route, Routes} from "react-router-dom";
import Certificate from "../pages/certificate/Certificate";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = () => {
    const {store} = useContext(Context)

    return (
        (store.isAuth)
            ? <Routes>
                <Route path="/certificates" element={<Certificate/>}/>
                <Route path="*" element={<Certificate/>}/>
            </Routes>
            : <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<Login/>}/>
            </Routes>
    );
};

export default observer(AppRouter);