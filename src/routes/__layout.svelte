<script context="module" lang="ts">
	import { publicPages } from '$lib/consts';
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load(session) {
		const { path } = session.page;
		if (publicPages.includes(path)) {
			return {};
		}

		if (!session.session.isLoggedIn) {
			return {
				status: 301,
				redirect: '/'
			};
		}
		return {};
	}
</script>

<script lang="ts">
	import '../app.postcss';
	import { session } from '$app/stores';
	import Cookies from 'js-cookie';
	function login() {
		Cookies.set('token', 'haha');
		window.location.reload();
	}
	function logout() {
		Cookies.remove('token');
		window.location.reload();
	}

</script>

<nav class="text-xl flex justify-center space-x-4 font-bold">
	<a class="hover:underline" href=".">Home</a>
	<a class="hover:underline" rel="external" href="api">About (public backend)</a>
	<a class="hover:underline" href="about">About (private frontend)</a>
	<a class="hover:underline" rel="external" href="api/private">About (private backend)</a>
	{#if $session.isLoggedIn}
		<button on:click={logout} class="font-bold hover:underline">Logout</button>
	{:else}
		<button on:click={login} class="font-bold hover:underline">Login</button>
	{/if}
</nav>
<div class="text-center pt-10">
	<slot />
</div>
