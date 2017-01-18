#Purpose
Implementation of Provider for [rrrouter](https://github.com/plandem/rrrouter) with [redux](https://github.com/reactjs/redux) support.

#Installation
```
npm install --save rrrouter-provider-redux
```

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

