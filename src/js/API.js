export default class API {
    constructor(url) {
        this.url = url;
        this.contentTypeHeader = {'Content-Type': 'application/json'};
    }; 
    
    
    pull(id) {
        return fetch(`${this.url}/?id=${id}` , {
            method: 'GET',
            headers: this.contentTypeHeader,
        });
    }

    logAdmin(data) {
        return fetch(`${this.url}/admin` , {
            body: JSON.stringify(data),
            method: 'POST',
            headers: this.contentTypeHeader,
        });
    }

    push(user) {
        return fetch(`${this.url}/users`, {
            body: JSON.stringify(user),
            method: 'POST',
            headers: this.contentTypeHeader,
        });
    };

    pullUsers() {
        return fetch(`${this.url}/userbank` , {
            method: 'GET',
            headers: this.contentTypeHeader,
        });
    }

}