import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from 'reducers';
import {Route,Switch} from 'react-router';

import HomePage from 'components/HomePage';
import ErrorPage from 'components/ErrorPage';

export const store = createStore(reducer, applyMiddleware(ReduxThunk));

const forceRefresh = !('pushState' in window.history);

window.onload = () => {
    render((
        <Provider store={store}>
            <BrowserRouter forceRefresh={forceRefresh}>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    ), document.getElementById('app'));
};

