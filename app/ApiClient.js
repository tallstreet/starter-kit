import 'whatwg-fetch';
import 'es6-promise';

class ApiClient {
  constructor() {
  }

  fetch(url, options) {
    return fetch(url, options).then((res) => res.json());
  }
}

export default ApiClient;
