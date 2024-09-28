<script lang="ts">
	import { onMount } from 'svelte';
	import { nums, keyboards as Keys, setKeyboard } from '$lib';

    let keyboards: string[][]= []

    $: setKeyboard()
    $: Keys.subscribe(value => {
        keyboards = value
    })
</script>

<div class="w-full flex flex-wrap gap-2">
	{#each keyboards as row}
		<div class="grid col-span-10 gap-2">
			{#each row as key}
				<button
					class="bg-sky-500 text-sky-50 rounded-md flex justify-center items-center shadow-lg shadow-sky-500/40"
				>
					{key}
				</button>
			{/each}
		</div>
	{/each}
</div>
