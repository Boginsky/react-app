import axios from "axios";
import $api from "../http";

export default class CertificateService {

    static async getAll(page = 0, size = 10) {
        return $api.get('http://localhost:5000/gift-certificates', {
            params: {
                page: page,
                size: size
            }
        })
    }

    static async delete(id) {
        return $api.delete('/gift-certificates/' + id)
    }

    static async create(data) {
        return $api.post('http://localhost:5000/gift-certificates', {data})
    }

    static async update(id, data) {
        return axios.patch('http://localhost:5000/gift-certificates/' + id, {data})
    }
}
