#Purpose
Implementation of Provider for [rrrouter](https://github.com/plandem/rrrouter) with [redux](https://github.com/reactjs/redux) support and [rrrouter-history](https://github.com/plandem/rrrouter-history) as history session manager.

#Installation
```
npm install --save rrrouter-provider-redux
```

#API

###Actions

| Action         | Description              |
|----------------|--------------------------|
| navigate(href) | Navigate to desired href, where **href** is string of location to navigate |
| go(page)       | Move forward/backward in browser history, where **page** is number of pages to move. |
| back()         | Move backward - alias for go(-1) |
| forward()      | Move forward - alias for go(+1) |



P.S.: All actions has prefix that you can get via ROUTER_ACTION, so you can test type of action and do what you need at own reducer/middleware.
```js
import { ROUTER_ACTION } from 'rrrouter-provider-redux';

const routerAction = new RegExp(`^${ROUTER_ACTION}`);

export default function myReducer (state = { }, action) {
	if (!routerAction.test(action.type)) {
		return state;
	}

	....do something in case of router action....
	return newState;
}
```

**N.B.:** _In most cases you will not use these actions directly, because all that you need - use methods of Router to navigate. Consider this actions as low-level implementation **for** Router and nothing more._

###Provider

| Property   | Description    | Type             | Default       |
|------------|----------------|------------------|---------------|
| stateKey   | Name of reducer that you used | String | no |
| initHref   | Initial href that will be used at startup | String | no |


#Usage
1. Setup middleware
2. Setup reducer
3. Setup Provider

###Example.1 - setup middleware
```js
import { applyMiddleware, createStore } from 'redux';
import { createMiddleware, HashHistory } from 'rrrouter-provider-redux';

export default function configureStore (rootReducer) {
	const history = new HashHistory();
	const routerMiddleware = createMiddleware(history);

	const middleware = [routerMiddleware];

	const store = createStore(
		rootReducer,
		applyMiddleware(...middleware),
	);

	return store;
}
```

###Example.2 - setup reducer
```js
import { combineReducers } from 'redux';
import { reducer as router} from 'rrrouter-provider-redux';

export default combineReducers({
	router,
});
```

###Example.3 - setup Provider
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Provider as RouteProvider } from 'rrrouter-provider-redux';

import configureStore from './redux/configureStore';	//from Example.1
import rootReducer from './redux/rootReducer';			//from Example.2

const store = configureStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>
		<RouteProvider stateKey='router' initHref='/'>
			<div>Your application</div>
		</RouteProvider>
	</Provider>,
	document.getElementById('root')
);
```

