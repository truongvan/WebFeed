<script lang="ts">
    import type { Channel } from "$lib/db/channel";
    import { getItem } from "$lib/db/item";
    import { feedChannel } from "$lib/download/item";
    import { currentChannel } from "$lib/stores/channel";

    async function getOrFetchItem(channel: Channel) {
        let items = await getItem(channel.id);
        if (items.length === 0) {
            items = await feedChannel(channel);
        }
        return items;
    }
</script>

<div class="">
    {#if $currentChannel}
        {#await getOrFetchItem($currentChannel) then items}
            <div class="flex flex-col gap-y-3">
                {#each items as item}
                    <div
                        class=" shadow px-2 py-1 rounded w-full space-y-1 hover:shadow-lg"
                    >
                        <div class="flex space-x-2">
                            <div>{item.channel_id}</div>
                            <div>
                                {item.published_at
                                    ? new Date(
                                          item.published_at,
                                      ).toLocaleDateString()
                                    : ""}
                            </div>
                        </div>

                        <div>{item.description}</div>
                        <div
                            class="text-xs font-mono text-nowrap overflow-ellipsis overflow-hidden"
                        >
                            {item.link}
                        </div>
                    </div>
                {/each}
            </div>
        {/await}
    {/if}
</div>
