import api from './api';

export const studentApi = {
    getBySbd: (sbd: string) => {
        return api.get(`/students/${sbd}`)
    },
    getTopGroupA: () => {
        return api.get(`/students/top-group-a`)
    }
}