import api from "./api"

export const subjectApi = {
    getReport: (subjectCodes: Array<string>) => {
        const params = new URLSearchParams({
            codes: subjectCodes.join(","),
        });

        return api.get(`/subjects/report?${params.toString()}`)
    },
    getAvgScore: (subjectCodes: Array<string>) => {
        const params = new URLSearchParams({
            codes: subjectCodes.join(","),
        });

        return api.get(`/subjects/avg-score?${params.toString()}`)
    },
    getPerfectScore: (subjectCodes: Array<string>) => {
        const params = new URLSearchParams({
            codes: subjectCodes.join(","),
        });

        return api.get(`/subjects/perfect-score?${params.toString()}`)
    },
}