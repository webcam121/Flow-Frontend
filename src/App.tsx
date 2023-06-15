import { useEffect } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import { store } from './store'
import { AuthProvider } from './contexts/AuthContext'

import View from './views';

function App() {

  useEffect(() => {
    document.title = "Chainplug";
  }, []);

  return (
    <div className="App">
      <ToastProvider
        autoDismiss
        autoDismissTimeout={6000}
        placement="top-right"
      >
        <Provider store={store}>
          <AuthProvider>
            <BrowserRouter>
              <View />
            </BrowserRouter>
          </AuthProvider>
        </Provider>
      </ToastProvider>
     </div>
  );
}

export default App;
