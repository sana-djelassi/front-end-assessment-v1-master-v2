import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import reducers from './reducers/reducers';
import sagas from "./saga/sagas";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension';
import {categoryApi} from './gateways/CategoryApi';
import {createHashHistory} from 'history';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
const history = createHashHistory();
const deps = {history, categoryApi};
export default function configureStore(initialState) {

    const store = createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(...middlewares,thunk.withExtraArgument(deps)))
    );

    sagaMiddleware.run(sagas);

    // if (module.hot) {
    //     module.hot.accept('./reducers/reducers', () => {
    //         const nextRootReducer = require('./reducers/reducers');
    //         store.replaceReducer(nextRootReducer);
    //     });
    // }

    return store;
}