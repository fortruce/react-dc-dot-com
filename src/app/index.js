import { Router, Route } from 'react-router';
import { App, About, Resources, Http404, Articles } from "./components/containers";

import { compose, createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import * as reducers from "./reducers";

Parse.initialize("6rkFSUyFZC3ij0oA6KMnQb5rKPVsayCPEfa6mzPA", "e9RSCSodcUqM7pqEmEu85BykaSSAjFmLRI7ZIYsL");

const logger = store => next => action => {
	console.group(action.type);
	console.info("dispatching", action);
	const result = next(action);
	console.log("next state", store.getState());
	console.groupEnd(action.type);
	return result;
}

const reducer = combineReducers(reducers);
const finalCreateStore = compose(
	applyMiddleware(
		thunk,
		logger
	)
)(createStore);
const store = finalCreateStore(reducer);

const routes = (
	<Router>
		<Route path="/" component={ App }>
			<Route path="about" component={ About }/>
			<Route path="resources" component={ Resources } />
			<Route path="articles" component={ Articles } />
			<Route path="*" component={ Http404 }/>
		</Route>
	</Router>
);

ReactDOM.render(
	<Provider store={ store }>
		{ routes }
	</Provider>,
	document.getElementById("app")
);
