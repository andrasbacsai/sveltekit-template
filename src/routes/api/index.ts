import type { Request } from '@sveltejs/kit';

export async function get(request: Request) {
    return {
        status: 200,
        body: {
            HEY: 'I\'m NOT protected. You are NOT logged in!'
        }
    }
}