import { ACTION_PREFIX } from './actions';
const routerAction = new RegExp(`^${ACTION_PREFIX}`);

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



