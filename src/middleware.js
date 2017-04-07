import { parseHref } from 'rrrouter-history';
import { GO, NAVIGATE, ROUTER_ACTION, replace } from './actions';

export default function createMiddleware(history) {
	return store => {
		if (history) {
			history.subscribe((href) => store.dispatch(replace(href)));
		}

		const routerAction = new RegExp(`^${ROUTER_ACTION}`);

		return next => action => {
			if(!action) {
				return;
			}

			if (!routerAction.test(action.type)) {
				return next(action);
			}

			if(action.type === GO && history) {
				return history.go(action.page);
			}

			const result = next({
				...action,
				...parseHref(action.href),
			});

			if (history) {
				history.update(result.href, result.type === NAVIGATE);
			}

			return result;
		}
	}
}
