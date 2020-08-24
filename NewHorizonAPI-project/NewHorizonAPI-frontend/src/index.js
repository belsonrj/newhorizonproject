// test that we can get data from the backend
//const BACKEND_URL = ('localhost', { mode: 'no-cors' });
const BACKEND_URL = 'http://[::1]:3000';
fetch(`${BACKEND_URL}/test`)
    .then(response => response.json())
    .then(parsedResponse => console.log(parsedResponse));