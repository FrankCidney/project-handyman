import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import UserContextProvider from './context/UserContext';
import SocketContextProvider from './context/SocketContext';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CategoriesContextProvider from './context/CategoriesContext';
import NavContextProvider from './context/NavContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <SocketContextProvider>
          <NavContextProvider>
            <CategoriesContextProvider>
              <StyledEngineProvider injectFirst>
                <App />
              </StyledEngineProvider>
            </CategoriesContextProvider>
          </NavContextProvider>
        </SocketContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
