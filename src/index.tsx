import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MantineProvider } from '@mantine/core';
import { themes } from './themes';
import '@mantine/core/styles.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <MantineProvider theme={themes} >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MantineProvider>
);

