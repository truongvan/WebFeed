<script lang="ts">
    import type { Channel as ChannelModel } from "$lib/db/channel";
    import ChannelRename from "./ChannelRename.svelte";
    import ChannelButton from "./ChannelButton.svelte";
    import { channelsStore, currentChannel } from "$lib/stores/channel";
    export let channel: ChannelModel;

    let editable = false;
</script>

{#if editable}
    <ChannelRename
        bind:name={channel.name}
        closeInput={function () {
            editable = false;
        }}
    />
{:else}
    <ChannelButton
        name={channel.name}
        channelID={channel.id}
        iconPath={channel.iconPath}
        handleActive={() => {
            currentChannel.set(channel);
        }}
        handleDblclick={function () {
            editable = true;
        }}
        handleDelete={() => {
            if ($channelsStore) {
                $channelsStore = $channelsStore.filter(
                    (c) => c.id !== channel.id,
                );
            }
        }}
    />
{/if}
