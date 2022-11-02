import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {fetchCategories} from './actions/categories';
import {fetchProducts} from './actions/products';
import {createHashHistory} from 'history';
import {Router} from 'react-router-dom';
import configureStore from "./store"



const initialState = {};
const store = configureStore(initialState);

const history = createHashHistory();

store.dispatch(fetchCategories());
store.dispatch(fetchProducts());

ReactDOM.render(
	<div className="content">
		<div className="container">
			 <Provider store={store}>
				<Router history={history}>
					<App/>
				</Router>
			</Provider>
		</div>
	</div>,
	document.getElementById('root')
);
