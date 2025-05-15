import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { Provider } from 'react-redux'; // Import Provider from react-redux
import './index.css';
import App from './App.jsx';
import store from './store/store.js'; // Import the store you've configured
// Use createRoot to render the app inside the root element
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap your app with BrowserRouter and Provider */}
    <Provider store={store}> {/* Redux provider */}
      <BrowserRouter> {/* React Router provider */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
