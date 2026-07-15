import api from "./api"

export const subjectApi = {
    getReport: (subjectCodes: Array<string>) => {
        const params = new URLSearchParams({
            codes: subjectCodes.join(","),
        });

        return api.get(`/subjects/report?${params.toString()}`)
    }
}