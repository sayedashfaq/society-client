import axios from 'axios'


const API = axios.create({ baseURL: 'https://society-server-n7ay.onrender.com' });

export const logIn= (formData)=> API.post('/auth/login',formData);

export const signUp = (formData) => API.post('/auth/register', formData);
