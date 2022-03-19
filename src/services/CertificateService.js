import axios from "axios";

export default class CertificateService {

    static async getAll(page = 0, size = 10) {
        return axios.get('http://localhost:5000/gift-certificates', {
            params: {
                page: page,
                size: size
            }, headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                AuthorizationRefresh: `Bearer ${localStorage.getItem('tokenRefresh')}`
            }
        })
    }

    static async delete(id) {
        return axios.delete('http://localhost:5000/gift-certificates/' + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                AuthorizationRefresh: `Bearer ${localStorage.getItem('tokenRefresh')}`
            }
        })
    }

    static async create(data) {
        return axios.post('http://localhost:5000/gift-certificates', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                AuthorizationRefresh: `Bearer ${localStorage.getItem('tokenRefresh')}`
            }
        })
    }

    static async update(id, data) {
        return axios.patch('http://localhost:5000/gift-certificates/' + id, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                AuthorizationRefresh: `Bearer ${localStorage.getItem('tokenRefresh')}`
            }
        })
    }
}
