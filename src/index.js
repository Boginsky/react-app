import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import Footer from "./components/UI/footer/Footer";
import Store from "./store/Store";
import CustomNavBar from "./components/UI/navbar/CustomNavBar";

const store = new Store();

export const Context = createContext({
    store,
})

ReactDOM.render(
    <BrowserRouter>
        <Context.Provider value={{
            store
        }}>
            <CustomNavBar/>
            <App/>
            <Footer/>
        </Context.Provider>
    </BrowserRouter>,
    document.getElementById('root')
);