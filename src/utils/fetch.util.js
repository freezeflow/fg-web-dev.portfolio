export default class fetchApi{
    credentials = false
    token = ''
    constructor(credentials, token=''){
        this.credentials = credentials
        this.token = token
    }

    _addAuthHeader(headers) {
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
    }

    async post(url, body = null) {
        const fetchOptions = {
            method: 'POST',
            headers: {},
            body: null
        };
        if (body instanceof FormData) {
            fetchOptions.body = body;
        } else {
            fetchOptions.headers['Content-Type'] = 'application/json';
            fetchOptions.body = JSON.stringify(body);
        }
        this._addAuthHeader(fetchOptions.headers);
        if (this.credentials) {
            fetchOptions.credentials = 'include';
        }
        const res = await fetch(url, fetchOptions);
        return res;
    }

    async get(url){
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        this._addAuthHeader(fetchOptions.headers);
        if (this.credentials) {
            fetchOptions.credentials = 'include';
        }
        const res = await fetch(url, fetchOptions);
        return res;
    }

    async put(url, body) {
        const fetchOptions = {
            method: 'PUT',
            headers: {},
            body: null
        };
        if (body instanceof FormData) {
            fetchOptions.body = body;
        } else {
            fetchOptions.headers['Content-Type'] = 'application/json';
            fetchOptions.body = JSON.stringify(body);
        }
        this._addAuthHeader(fetchOptions.headers);
        if (this.credentials) {
            fetchOptions.credentials = 'include';
        }
        const res = await fetch(url, fetchOptions);
        return res;
    }

    async delete(url, body) {
        const fetchOptions = {
            method: 'DELETE',
            headers: {},
            body: null
        };
        if (body instanceof FormData) {
            fetchOptions.body = body;
        } else if (body) {
            fetchOptions.headers['Content-Type'] = 'application/json';
            fetchOptions.body = JSON.stringify(body);
        }
        this._addAuthHeader(fetchOptions.headers);
        if (this.credentials) {
            fetchOptions.credentials = 'include';
        }
        const res = await fetch(url, fetchOptions);
        return res;
    }

    async refresh(response){
        if (response.status !== 403) return response

        const refreshRes = await fetch(`${import.meta.env.VITE_API_URL}/api/refresh/`, {
            method: 'POST',
            credentials: 'include'
        })

        return refreshRes
    }

    async patch(url, body = null) {
        const fetchOptions = {
            method: 'PATCH',
            headers: {},
            body: null
        };

        if (body instanceof FormData) {
            fetchOptions.body = body;
        } else if (body) {
            fetchOptions.headers['Content-Type'] = 'application/json';
            fetchOptions.body = JSON.stringify(body);
        }

        this._addAuthHeader(fetchOptions.headers);

        if (this.credentials) {
            fetchOptions.credentials = 'include';
        }

        const res = await fetch(url, fetchOptions);
        return res;
    }

}