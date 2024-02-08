<script lang="ts">
    import { onMount } from "svelte";

    export let name = "";
    export let closeInput: CallableFunction;
    let inputElement: HTMLInputElement;

    onMount(() => {
        inputElement.focus();
        inputElement.select();
        document.body.addEventListener("click", function handle(e) {
            if (e.target !== inputElement) {
                document.body.removeEventListener("click", handle);
                closeInput();
            }
        });
    });
</script>

<input
    bind:this={inputElement}
    type="text"
    bind:value={name}
    on:keydown={() => closeInput()} />

<style lang="postcss">
    input {
        @apply block w-full rounded text-start px-3 py-0.5 border-solid border-gray-300;
        @apply text-gray-700;
    }
</style>
