// api.ts
const API_URL: string = (import.meta as any).env.VITE_API_URL || 'http://localhost:3000/api/v1';

async function parseErrorMessage(response: Response, fallback: string): Promise<string> {
    try {
        const data = await response.clone().json();
        if (!data) return fallback;

        if (typeof data.message === 'string') return data.message;
        if (Array.isArray(data.message) && data.message.length > 0) {
            return data.message.join(', ');
        }

        return fallback;
    } catch {
        return fallback;
    }
}

async function parseBody<T>(response: Response): Promise<T | string | null> {
    const text = await response.text();
    if (!text) return null;
    try {
        return JSON.parse(text) as T;
    } catch {
        return text;
    }
}

class Api {
    private readonly BASE_URL: string;

    constructor() {
        this.BASE_URL = API_URL;
    }

    async get<T>(ENDPOINT: string): Promise<T | string | null> {
        const response = await fetch(this.BASE_URL + ENDPOINT, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(await parseErrorMessage(response, `GET ${ENDPOINT} failed: ${response.status}`));
        }
        
        return parseBody<T>(response);
    }

    async post<T, D = any>(ENDPOINT: string, DATA: D, HEADERS: string = 'application/json'): Promise<T | string | null> {
        const isFormData = DATA instanceof FormData;
        const response = await fetch(this.BASE_URL + ENDPOINT, {
            method: 'POST',
            credentials: 'include',
            headers: isFormData ? {} : { 'Content-Type': HEADERS },
            body: isFormData ? (DATA as any) : JSON.stringify(DATA),
        });

        if (!response.ok) {
            throw new Error(await parseErrorMessage(response, `POST ${ENDPOINT} failed: ${response.status}`));
        }
        return parseBody<T>(response);
    }

    async put<T, D = any>(ENDPOINT: string, DATA: D, HEADERS: string = 'application/json'): Promise<T | string | null> {
        const isFormData = DATA instanceof FormData;

        const response = await fetch(this.BASE_URL + ENDPOINT, {
            method: 'PUT',
            credentials: 'include',
            headers: isFormData ? {} : { 'Content-Type': HEADERS },
            body: isFormData ? (DATA as any) : JSON.stringify(DATA),
        });

        if (!response.ok) {
            throw new Error(await parseErrorMessage(response, `PUT ${ENDPOINT} failed: ${response.status}`));
        }
        return parseBody<T>(response);
    }

    async patch<T, D = any>(ENDPOINT: string, DATA: D, HEADERS: string = 'application/json'): Promise<T | string | null> {
        const isFormData = DATA instanceof FormData;

        const response = await fetch(this.BASE_URL + ENDPOINT, {
            method: 'PATCH',
            credentials: 'include',
            headers: isFormData ? {} : { 'Content-Type': HEADERS },
            body: isFormData ? (DATA as any) : (DATA !== undefined ? JSON.stringify(DATA) : undefined),
        });

        if (!response.ok) {
            throw new Error(await parseErrorMessage(response, `PATCH ${ENDPOINT} failed: ${response.status}`));
        }
        return parseBody<T>(response);
    }

    async delete<T>(ENDPOINT: string): Promise<T | string | null> {
        const response = await fetch(this.BASE_URL + ENDPOINT, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(await parseErrorMessage(response, `DELETE ${ENDPOINT} failed: ${response.status}`));
        }
        return parseBody<T>(response);
    }
}

export default new Api();