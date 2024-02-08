<script lang="ts">
    export let active = false;
    export let onclick = () => {
        active = !active;
    };
</script>

<button aria-current={active} on:click={onclick} on:click class="">
    <slot />
</button>

<style lang="postcss">
    button {
        @apply block w-full rounded text-start px-2 py-0.5;
        @apply text-gray-700;
        @apply aria-[current='true']:bg-gray-800 aria-[current='true']:text-gray-200;
    }
</style>
