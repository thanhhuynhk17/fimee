export default class HttpClient
{
    get(url, header, cb = undefined)
    {
        return fetch(url, {
            method: 'GET',
            headers: new Headers(header || {
                'Content-Type': 'application/json',
            }),
        })
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(this.checkError)
            .then(cb)
            .catch(console.log);
    }

    getWithParams(url, params, header, cb)
    {
        let qs = '';
        if (params)
        {
            const esc = encodeURIComponent;
            qs = Object.keys(params).map(k => esc(k) + '=' + esc(params[k])).join('&');
            if (qs)
            {
                qs = '?' + qs;
            }
        }
        console.log(url+qs);
        return fetch(url + qs, {
            method: 'GET',
            headers: new Headers(header || {
                'Content-Type': 'application/json',
            }),
        })
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(this.checkError)
            .then(cb)
            .catch(console.log);
    }

    getImage(url, header, cb = undefined)
    {
        return fetch(url, {
            method: 'GET',
            headers: new Headers(header || {
                'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
            }),
        })
            .then(this.checkStatus)
            .then(this.checkError)
            .then(cb)
            .catch(console.log);
    }

    post(url, data, header, cb = undefined)
    {
        return fetch(url, {
            method: 'POST',
            headers: new Headers(header || {
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(data),
        })
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(this.checkError)
            .then(cb)
            .catch(console.log);
    }
    postWithParams(url, params, data, header, cb = undefined)
    {
        let qs = '';
        if (params)
        {
            const esc = encodeURIComponent;
            qs = Object.keys(params).map(k => esc(k) + '=' + esc(params[k])).join('&');
            if (qs)
            {
                qs = '?' + qs;
            }
        }

        return fetch(url+qs, {
            method: 'POST',
            headers: new Headers(header || {
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(data),
        })
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(this.checkError)
            .then(cb)
            .catch(console.log);
    }

    postFileStream(url, data, header = undefined, cb = undefined)
    {
        return fetch(url, {
            method: 'POST',
            headers: new Headers(header || {
                'Content-Type': 'application/octet-stream',
            }),
            body: JSON.stringify(data),
        })
            .then(this.checkStatus)
            .then(this.checkError)
            .then(cb)
            .catch(console.log);
    }

    postFile(url, formData, header, cb)
    {
        return fetch(url, {
            method: 'POST',
            headers: header,
            body: formData,
        })
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(this.checkError)
            .then(cb)
            .catch(console.log);
    }

    patch(url, data, header, cb = undefined)
    {
        return fetch(url, {
            method: 'PATCH',
            headers: new Headers(header || {
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(data),
        })
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(this.checkError)
            .then(cb)
            .catch(console.log);
    }

    put(url, data, header, cb = undefined)
    {
        return fetch(url, {
            method: 'PUT',
            headers: new Headers(header || {
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(data),
        })
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(this.checkError)
            .then(cb)
            .catch(console.log);
    }

    delete(url, data, header, cb = undefined)
    {
        return fetch(url, {
            method: 'DELETE',
            headers: new Headers(header || {
                'Content-Type': 'application/json',
            }),
            body: data ? JSON.stringify(data) : null,
        })
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(this.checkError)
            .then(cb)
            .catch(console.log);
    }

    checkStatus(response)
    {
        if (response.status >= 200 && response.status < 300)
        {
            return response;
        }

        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;

        // throw error;
        return response;
    }

    parseJSON(response)
    {
        return response.json();
    }

    checkError(response)
    {
        if (response && response.error)
        {
            // todo: add dialog style later
            // alert(response.error.message);
            console.log(response.error.message);

            return null;
        }

        return response;
    }
}
