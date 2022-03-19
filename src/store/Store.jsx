import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";

export default class Store {

    isAuth = false
    error = ''

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    setError(error) {
        this.error = error
    }

    async login(username, password) {
        try {
            const response = await AuthService.login(username, password);
            localStorage.setItem('token', response.data.jwt);
            localStorage.setItem('tokenRefresh', response.data.jwtRefresh);
            localStorage.setItem('username', response.data.username);
            this.setAuth(true)
        } catch (e) {
            if (e.response.status === 401) {
                await this.refreshToken()
            }
            if (e.response.status === 403 || e.response.status === 404) {
                this.setError('Wrong credentials')
            }
        }
    }

    async refreshToken() {
        try {
            const response = await AuthService.refresh();
            localStorage.setItem('token', response.data.jwt);
            localStorage.setItem('tokenRefresh', response.data.jwtRefresh);
            localStorage.setItem('username', response.data.username);
            this.setAuth(true)
        } catch (e) {
            localStorage.clear()
            this.setError("Session timed out, please try again")
        }
    }

    async logout() {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenRefresh');
            localStorage.removeItem('username');
            this.setAuth(false)
        } catch (e) {
            console.log(e.message)
        }
    }
}