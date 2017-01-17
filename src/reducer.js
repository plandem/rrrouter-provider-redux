import { ROUTER_ACTION } from './actions';

const routerAction = new RegExp(`^${ROUTER_ACTION}`);

export default function reducer (state = { }, action) {
	if (!routerAction.test(action.type)) {
		return state;
	}

	return {
		href: action.href,
		location: action.location,
		query: action.query,
	};
}



