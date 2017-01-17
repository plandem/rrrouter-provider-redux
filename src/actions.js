export const ROUTER_ACTION = '@@rrrouter';
export const GO = `${ROUTER_ACTION}/go`;
export const REPLACE = `${ROUTER_ACTION}/replace`;
export const NAVIGATE = `${ROUTER_ACTION}/navigate`;

export function replace (href) {
	return { type: REPLACE, href };
}

export function navigate (href) {
	return { type: NAVIGATE, href };
}

export function go(page) {
	return { type: GO, page };
}

export function back() {
	return { type: GO, page: -1 };
}

export function forward() {
	return { type: GO, page: 1 };
}