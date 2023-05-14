import axios from "axios";

const PORT = import.meta.env.VITE_SERVER_PORT;
// const base = `http://35.244.21.108:${PORT}`;
const base = `http://localhost:${PORT}`;
const API = axios.create({ baseURL: base });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});


export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const otpverify=(formData) => API.post('/user/otpverify',formData);
export const userExistsCheck=(formData) => API.post('/user/userexistscheck',formData);
export const validateotp=(loginData) => API.post('/user/validateotp',loginData);
export const createPdf=() => API.post('/action/createPdf');
export const sendfeedback=(contactUsFormData)=> API.post('/action/sendfeedback',contactUsFormData);
export const resendotp = (formData) => API.post('/user/resendotp', formData);
