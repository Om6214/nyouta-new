import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './Store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <GoogleOAuthProvider clientId="134448973901-5i5v9air5pmirrcelodj5uhqoo707ccb.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
      <ToastContainer/>
    </PersistGate>
    </Provider>
  </StrictMode>,
)

