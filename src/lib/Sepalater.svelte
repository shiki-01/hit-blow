<script lang="ts">
    import Icon from "@iconify/svelte";

    export let player: string = ''
    export let color: string = '#000'
</script>

<div
    class="fixed w-full h-full flex flex-col justify-center items-center gap-10"
    style="background-color: {color}"
>
    <p class="text-lg">Next Player: {player}</p>
    <button
        class="w-fit py-2 px-4 flex flex-row gap-2 shadow-lg"
        style="background-color: lighten({color}, 10%)"
    >
        <p>Next</p>
        <Icon icon='bi:arrow-right' />
    </button>
</div>