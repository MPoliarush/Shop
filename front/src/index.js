import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/FirstPage.css'
import './components/News/News.css'
import './components/Header/Header.css'
import './components/Header/OrderCart.css'
import './components/Header/Confirmation.css'
import './components/Header/Comparison.css'

import './components/Header/Login/Login.css'
import './components/Header/Login/Registration.css'
import './components/Header/Login/Authorized.css'

import './components/Catalogs/CatalogCamera.css'
import './components/Catalogs/CatalogLinse.css'
import './components/Catalogs/ProductPage.css'
import './components/Admin/Admin.css'
import './components/Admin/AdminCart.css'
import './components/Footer.css'



import store from './store/store'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import {persistStore} from 'redux-persist'

import App from './App';

let persistor = persistStore(store)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
      
  </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

