<script lang="ts">
    export let active = false;
    export let onclick = () => {};
</script>

<button aria-current={active} on:click={onclick}>
    <slot />
</button>

<style lang="postcss">
    button {
        @apply p-1 m-auto block text-gray-800 rounded;
        @apply hover:bg-gray-200 active:bg-gray-300;
        @apply aria-[current='true']:bg-blue-500 aria-[current='true']:text-gray-100 aria-[current='true']:active:bg-blue-600;
    }
</style>
