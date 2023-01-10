import axios from 'axios';

const PORT=import.meta.env.VITE_SERVER_PORT;
const base=`http://localhost:${PORT}` ;
const API = axios.create({ baseURL: base });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    console.log(req.headers.Authorization);
    console.log(JSON.parse(localStorage.getItem('profile')));
  }

  return req;
});

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);