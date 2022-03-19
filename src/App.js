import React, {useContext, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import AppRouter from "./components/AppRouter";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import './styles/App.css'


function App() {
    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.isAuth = true
        }
    }, [])

    return (
        <AppRouter/>
    );
}

export default observer(App);
