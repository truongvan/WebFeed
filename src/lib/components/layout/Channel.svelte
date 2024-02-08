<script lang="ts">
    import type { Channel as ChannelModel } from "$lib/db/channel";
    import ChannelRename from "./ChannelRename.svelte";
    import ChannelButton from "./ChannelButton.svelte";
    export let channel: ChannelModel;

    let editable = false;
</script>

{#if editable}
    <ChannelRename
        bind:name={channel.name}
        closeInput={function () {
            editable = false;
        }} />
{:else}
    <ChannelButton
        on:active={function () {
            // editable = true;
        }}
        name={channel.name}
        ondblclick={function () {
            editable = true;
        }} />
{/if}
