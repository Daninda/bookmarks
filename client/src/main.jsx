import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import App from './App.jsx';
import './index.css';
import store from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer
        toastClassName={
          'mb-4 ml-4 w-[calc(100%-2rem)] sm:w-auto sm:m-auto rounded bg-surface'
        }
        bodyClassName={'text-base text-textColor'}
        position='bottom-center'
        autoClose={150000}
        stacked
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        transition={Slide}
      />
      <App />
    </BrowserRouter>
  </Provider>
);
