import React, {useContext, useEffect, useState} from 'react';
import classes from "./Login.module.css"
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";


const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState('')
    const navigate = useNavigate()

    function onLinkClick(e) {
        e.preventDefault()
        if (formError === '') {
            store.login(username, password)
            navigate("../certificates?page=1&size=10", {replace: true})
        }
    }

    useEffect(() => {
        checkForm()
    }, [username, password])

    function checkForm() {
        setFormError('')
        if (username.length < 3 || username.length > 30) {
            setFormError('login')
        } else if (password.length < 4 || password.length > 30) {
            setFormError('password')
        }
    }

    const {store} = useContext(Context)

    return (
        <div className={classes.fadeInDown}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card my-5">
                            <form className="card-body cardbody-color p-lg-5">
                                <div className="text-center">
                                    <img src="https://cdn-icons-png.flaticon.com/512/947/947496.png"
                                         className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                         width="200px" alt="profile"/>

                                </div>
                                {store.error !== ''
                                    ? <div id='errorTemplate' className="alert alert-danger" role="alert">
                                        <a>Error: {store.error}</a>
                                    </div>
                                    : ''
                                }
                                <div className="mb-3">
                                    <input
                                        onChange={e => setUsername(e.target.value)}
                                        value={username}
                                        type="text"
                                        className={formError === 'login' ? 'form-control is-invalid' : 'form-control'}
                                        placeholder="login"
                                        minLength={3}
                                        maxLength={30}
                                    />
                                    {formError === 'login' ?
                                        <small id="passwordHelp" className="text-danger">
                                            Must be 3-30 characters long.
                                        </small>
                                        : ''}
                                </div>
                                <div className="mb-3">
                                    <input type="password"
                                           onChange={e => setPassword(e.target.value)}
                                           value={password}
                                           className={formError === 'password' ? 'form-control is-invalid' : 'form-control'}
                                           id="password"
                                           placeholder="password"
                                           autoComplete='off'
                                           minLength={4}
                                           maxLength={30}/>
                                    {formError === 'password' ?
                                        <small id="passwordHelp" className="text-danger">
                                            Must be 4-30 characters long.
                                        </small>
                                        : ''}
                                </div>
                                <div className="text-center">
                                    <button
                                        onClick={onLinkClick}
                                        type="submit"
                                        className="btn btn-secondary btn-lg btn-block">Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(Login);