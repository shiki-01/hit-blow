<script lang="ts">
	import '../app.css';
	import Icon from '@iconify/svelte';
	import { Range, Label } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { gameTypeS, digitsS, type GameType, type Digits } from '$lib';

	let isSetOpen = false;
	let isFull = false;
	let theme: 'light' | 'dark' = 'light';
	let value: 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
	let gameType: GameType;
	let GTCookie: string;
	let digits: Digits;

	onMount(() => {
		if (typeof window !== 'undefined') {
			const themeCookie = window.document.cookie
				.split('; ')
				.find((row) => row.startsWith('theme='));
			const gameTypeCookie = window.document.cookie
				.split('; ')
				.find((row) => row.startsWith('gameType='));
			const digitsCookie = window.document.cookie
				.split('; ')
				.find((row) => row.startsWith('digits='));
			if (themeCookie) {
				theme = themeCookie.split('=')[1] as 'light' | 'dark';
			} else {
				theme = 'light';
			}
			if (gameTypeCookie) {
				if (gameTypeCookie.split('=')[1] === 'abc' || gameTypeCookie.split('=')[1] === 'a2') {
					gameType = gameTypeCookie.split('=')[1] as 'abc' | 'a2';
					value = 3;
				} else {
					gameType = parseInt(gameTypeCookie.split('=')[1]) as GameType
				}
				GTCookie = gameTypeCookie;
			} else {
				gameType = 9;
			}
			if (digitsCookie) {
				digits = parseInt(digitsCookie.split('=')[1]) as Digits;
			} else {
				digits = 4;
			}
			themeChange();
		}
	});

	$: if (typeof gameType === 'number') {
		value = gameType;
	}

	$: if (GTCookie && gameType !== GTCookie.split('=')[1]) {
		if (typeof window !== 'undefined') {
			window.document.cookie = `gameType=${gameType};`;
		}
		gameTypeS.set(gameType);
	}

	const themeChange = () => {
		if (typeof window !== 'undefined') {
			window.document.documentElement.classList.remove('light', 'dark');
			window.document.documentElement.classList.add(theme);
			window.document.cookie = `theme=${theme};`;
		}
	};

	const fullscreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen();
			isFull = false;
		} else {
			document.documentElement.requestFullscreen();
			isFull = true;
		}
	};
</script>

<svelte:head>
	<title>Hit & Blow</title>
</svelte:head>

<main
	class="relative w-screen h-screen bg-slate-50 dark:bg-sky-950 text-slate-800 dark:text-slate-50 grid grid-rows-[60px_1fr] transition-[color,background] duration-300"
>
	<button class="absolute bottom-5 right-5" on:click={fullscreen}>
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
	<div class="p-5 space-y-5">
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
						themeChange();
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
						themeChange();
					}}
				>
					<p>Dark</p>
					<Icon icon="bi:moon-fill" />
				</button>
			</div>
		</div>
		<div>
			<p>Game Type</p>
			<div class="p-2">
				<div class="pb-5">
					{#if gameType == 'abc' || gameType == 'a2'}
						<Range
							bind:value
							min={3}
							max={10}
							on:change={() => {
								gameType = value;
							}}
						/>
					{:else if typeof gameType === 'number'}
						<Range bind:value={gameType} min={3} max={10} />
					{/if}
				</div>
				<div class="grid grid-cols-3 gap-2">
					<button
						class="w-full py-2 px-4 rounded-md border border-sky-400 shadow-md shadow-sky-400/40 flex flex-row justify-between items-center transition-colors {gameType ==
							'abc' || gameType == 'a2'
							? 'bg-slate-50 dark:bg-sky-950 text-slate-800 dark:text-slate-50'
							: 'bg-sky-400 text-sky-50'}"
						on:click={() => {
							gameType = value;
						}}
					>
						<p class="w-full text-center">
							{gameType == 'abc' || gameType == 'a2' ? value : gameType}
						</p>
					</button>
					<button
						class="w-full py-2 px-4 rounded-md border border-sky-400 shadow-md shadow-sky-400/40 flex flex-row justify-between items-center transition-colors {gameType ==
						'abc'
							? 'bg-sky-400 text-sky-50'
							: 'bg-slate-50 dark:bg-sky-950 text-slate-800 dark:text-slate-50'}"
						on:click={() => {
							gameType = 'abc';
						}}
					>
						<p class="w-full text-center">abc</p>
					</button>
					<button
						class="w-full py-2 px-4 rounded-md border border-sky-400 shadow-md shadow-sky-400/40 flex flex-row justify-between items-center transition-colors {gameType ==
						'a2'
							? 'bg-sky-400 text-sky-50'
							: 'bg-slate-50 dark:bg-sky-950 text-slate-800 dark:text-slate-50'}"
						on:click={() => {
							gameType = 'a2';
						}}
					>
						<p class="w-full text-center">a2</p>
					</button>
				</div>
			</div>
		</div>
		<div>
			<p>Number of Digits</p>
			<div class="p-2 flex flex-row gap-2 items-center">
				<Label>{digits}</Label>
				<Range
					bind:value={digits}
					min={3}
					max={9}
					on:change={() => {
						if (typeof window !== 'undefined') {
							window.document.cookie = `digits=${digits};`;
						}
						digitsS.set(digits);
					}}
				/>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.circle {
		@apply absolute left-[-5px] w-2 h-2 rounded-full bg-sky-400;
	}
</style>
