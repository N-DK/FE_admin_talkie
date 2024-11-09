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
// Import CSS cho Froala
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'react-device-frameset/styles/marvel-devices.min.css';

i18nConfig();
_app.getInitialData.theme();

if (typeof global === 'undefined') {
    window.global = window;
}

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <Provider store={store}>
        <App />
    </Provider>,
    // </StrictMode>,
);
