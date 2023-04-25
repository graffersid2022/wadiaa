import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import HttpsRedirect from 'react-https-redirect';
store.subscribe(() => {
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HttpsRedirect>
      <App />
    </HttpsRedirect>
  </Provider>
  // </React.StrictMode>
);

