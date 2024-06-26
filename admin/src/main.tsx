import React from 'react';
import ReactDOM from 'react-dom/client'
import MainRouter from './MainRouter.tsx'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
     <MainRouter />
)
