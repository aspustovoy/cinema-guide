import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { store } from './app/store';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
