import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
import './css/antdOverride.css';
import './css/scrollbar.css';
import './css/custom.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store';
import i18nConfig from './i18n';
import { _app } from './utils/_app.js';

i18nConfig();
_app.getInitialData.theme();

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <Provider store={store}>
        <App />
    </Provider>,
    // </StrictMode>,
);
