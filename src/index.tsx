import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from 'fronton-react';
import {store} from './store';
import App from './components/App';
import 'antd/dist/reset.css';
import './locales/i18n';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
