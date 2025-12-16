import router from "@/router";

export default class fetchApi {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL;
  }

  async _request(url, options = {}, retry = true) {
    const res = await fetch(url, { ...options, credentials: 'include' });

    if (res.status === 401 && retry) {
      // Try refreshing the token
      const refreshRes = await fetch(`${this.baseURL}/api/refresh`, {
        method: 'POST',
        credentials: 'include'
      });

      if (refreshRes.ok) {
        // Retry original request once
        return this._request(url, options, false);
      } else {
        router.push('/')
      }
    } else if(res.status === 403){
        router.push('/')
    }

    return res;
  }

  async get(url) {
    const res = await this._request(url, { method: 'GET' });
    return res;
  }

  async post(url, body = null) {
    const options = { method: 'POST', headers: {} };

    if (body instanceof FormData) {
      options.body = body;
    } else if (body) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }

    const res = await this._request(url, options);
    return res;
  }

  async put(url, body = null) {
    const options = { method: 'PUT', headers: {} };

    if (body instanceof FormData) {
      options.body = body;
    } else if (body) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }

    const res = await this._request(url, options);
    return res;
  }

  async patch(url, body = null) {
    const options = { method: 'PATCH', headers: {} };

    if (body instanceof FormData) {
      options.body = body;
    } else if (body) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }

    const res = await this._request(url, options);
    return res;
  }

  async delete(url, body = null) {
    const options = { method: 'DELETE', headers: {} };

    if (body instanceof FormData) {
      options.body = body;
    } else if (body) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }

    const res = await this._request(url, options);
    return res;
  }
}