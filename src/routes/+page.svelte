<script lang="ts">
    import Icon from "@iconify/svelte";
</script>

<div class="w-full h-full flex flex-col gap-10 justify-center items-center">
    <h1 class="text-center text-2xl">Hit & Blow</h1>
    <div class="w-full flex flex-col gap-5 items-center">
        <a
            class="w-fit bg-sky-500 text-sky-50 py-2 px-4 rounded-md flex flex-row gap-2 items-center shadow-lg shadow-sky-500/40"
            href="/game?mode=computer"
        >
            <p>with Computer</p>
            <Icon icon='bi:cpu-fill' />
        </a>
        <a
            class="w-fit bg-sky-500 text-sky-50 py-2 px-4 rounded-md flex flex-row gap-2 items-center shadow-lg shadow-sky-500/40"
            href="/game?mode=friend"
        >
            <p>with Friend</p>
            <Icon icon='bi:people-fill' />
        </a>
    </div>
</div>