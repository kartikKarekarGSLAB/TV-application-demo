import ReactDOM from 'react-dom';
import './i18n/config';
import './assets/styles/index.scss';
import App from './components/app/App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import reportWebVitals from './reportWebVitals';

const BASE_NAME = `/${process.env.REACT_APP_BASENAME || null}`;
ReactDOM.render(
    <Router basename={BASE_NAME}>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
