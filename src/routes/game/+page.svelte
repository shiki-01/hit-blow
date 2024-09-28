<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import SelectNum from '$lib/SelectNum.svelte';

	let mode: 'computer' | 'friend' | null = null;
    let step = 0

	onMount(() => {
		mode = $page.url.searchParams.get('mode') as 'computer' | 'friend';
	});
</script>

{#if mode}
	<div class="w-full h-full">
		<h2 class="text-xl">{mode}</h2>
        {#if step === 0}
			<SelectNum />
        {/if}
	</div>
{/if}
