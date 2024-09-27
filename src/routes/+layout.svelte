<script lang="ts">
	import '../app.css';
	import Icon from '@iconify/svelte';

	let isSetOpen = false;
    let isFull = false
	let theme: 'light' | 'dark' = 'light';

	$: if (typeof window !== 'undefined') {
		window.document.documentElement.classList.remove('light', 'dark');
		window.document.documentElement.classList.add(theme);
	}

    const fullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen()
            isFull = false
        } else {
            document.documentElement.requestFullscreen()
            isFull = true
        }
    }
</script>

<svelte:head>
    <title>Hit & Blow</title>
</svelte:head>

<main
	class="relative w-screen h-screen bg-slate-50 dark:bg-sky-950 text-slate-800 dark:text-slate-50 grid grid-rows-[60px_1fr] transition-[color,background] duration-300"
>
    <button
        class="absolute bottom-5 right-5"
        on:click={fullscreen}
    >
        <Icon icon={isFull ? 'bi:fullscreen-exit' : 'bi:fullscreen'} />
    </button>
	<div class="w-full h-full px-5 flex flex-row justify-between items-center">
		<div class="flex flex-row gap-2 items-center">
			<p>New Game</p>
			<Icon icon="bi:add-fill" />
		</div>
		<button
			class="flex flex-row gap-2 items-center"
			on:click={() => {
				isSetOpen = !isSetOpen;
			}}
		>
			<p>Settings</p>
			<Icon icon="bi:gear-fill" />
		</button>
	</div>
	<div class="w-full h-full p-5">
		<slot />
	</div>
</main>

<button
	class="fixed top-0 left-0 w-screen h-screen z-20 bg-slate-800/50 dark:bg-slate-50/50 duration-300 transition-[opacity,background] {isSetOpen
		? 'opacity-100 pointer-events-auto'
		: 'opacity-0 pointer-events-none'}"
	on:click={() => {
		isSetOpen = false;
	}}
/>

<div
	class="fixed w-[300px] h-full p-5 z-30 bg-slate-50 dark:bg-sky-950 text-slate-800 dark:text-slate-50 top-0 transition-[right,color,background] duration-300 {isSetOpen
		? 'right-0 shadow-lg'
		: 'right-[-300px]'}"
>
	<div class="w-full flex justify-end">
		<button
			class="flex flex-row gap-2 items-center"
			on:click={() => {
				isSetOpen = false;
			}}
		>
			<p>Settings</p>
			<Icon icon="bi:gear-fill" />
		</button>
	</div>
	<div class="p-5">
		<div>
			<p>Theme</p>
			<div class="p-2 space-y-1 relative">
				<span
					class="circle transition-[top,colors] duration-300 {theme == 'light'
						? 'top-5'
						: 'top-12'}"
				/>
				<button
					class="w-[60px] flex flex-row justify-between items-center transition-colors {theme ==
					'light'
						? 'text-sky-400'
						: 'text-slate-800 dark:text-slate-50'}"
					on:click={() => {
						theme = 'light';
					}}
				>
					<p>Light</p>
					<Icon icon="bi:sun-fill" />
				</button>
				<button
					class="w-[60px] flex flex-row justify-between items-center transition-colors {theme ==
					'dark'
						? 'text-sky-400'
						: 'text-slate-800 dark:text-slate-50'}"
					on:click={(j) => {
						theme = 'dark';
					}}
				>
					<p>Dark</p>
					<Icon icon="bi:moon-fill" />
				</button>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.circle {
		@apply absolute left-[-5px] w-2 h-2 rounded-full bg-sky-400;
	}
</style>
