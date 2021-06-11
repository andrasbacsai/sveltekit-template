import * as cookie from 'cookie'

import { publicPages } from '$lib/consts'

function verifyToken(token) {
	if (token === 'haha') {
		return true
	}
	return false

}

export async function handle({ request, resolve }) {
	const { token } = cookie.parse(request.headers.cookie || '');
	if (token) {
		request.locals.isLoggedIn = verifyToken(token)
	} else {
		request.locals.isLoggedIn = false
	}
	const response = await resolve(request);
	if (!request.locals.isLoggedIn && !publicPages.includes(request.path)) {
		return {
			status: 301,
			headers: {
				location: '/'
			}
		};
	}
	return {
		...response
	}
}

export function getSession(request) {
	const { isLoggedIn } = request.locals;
	return {
		isLoggedIn
	};
}
