import querystring from 'querystring';
import url from 'url';
import { GO, NAVIGATE, ACTION_PREFIX, replace } from './actions';

export default function createMiddleware(history) {
	return store => {
		if (history) {
			history.listen({
				replace: (href) => store.dispatch(replace(href))
			});
		}

		const routerAction = new RegExp(`^${ACTION_PREFIX}`);

		return next => action => {
			if (!routerAction.test(action.type)) {
				return next(action);
			}

			if(action.type === GO && history) {
				return history.go(action.page);
			}

			const parsed = url.parse(action.href);

			const location = {
				hash: parsed.hash || undefined,
				pathname: parsed.pathname,
				search: parsed.search || undefined,
			};

			let query;
			if(parsed.query) {
				query = querystring.parse(parsed.query);
			}

			const result = next({
				...action,
				query,
				location,
				href: url.format(location),
			});

			if (history) {
				history.update(result.href, result.type === NAVIGATE);
			}

			return result;
		}
	}
}
