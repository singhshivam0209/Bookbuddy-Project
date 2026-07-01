import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const globalStyles = `
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
  body { background-color: #f4f7f6; color: #333; }
  a { text-decoration: none; color: #2980b9; }
  button { cursor: pointer; }
`;

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <style>{globalStyles}</style>
    <App />
  </React.StrictMode>
);