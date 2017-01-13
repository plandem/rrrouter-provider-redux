export const ACTION_PREFIX = '@@rrrouter';
export const GO = `${ACTION_PREFIX}/go`;
export const REPLACE = `${ACTION_PREFIX}/replace`;
export const NAVIGATE = `${ACTION_PREFIX}/navigate`;

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