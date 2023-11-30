
import { RouterProvider } from 'react-router-dom';
import { router } from './navigation/RouterConfig'
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider >
    );
}

export default App;