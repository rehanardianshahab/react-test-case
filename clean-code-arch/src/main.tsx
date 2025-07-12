import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/reset.css';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
