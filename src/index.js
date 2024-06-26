import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const root = createRoot(document.getElementById('root')); // Use createRoot from react-dom/client
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
