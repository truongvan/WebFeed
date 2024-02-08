<script lang="ts">
    import { ChevronRight } from "lucide-svelte";
    import { createAccordion, melt } from "@melt-ui/svelte";
    import { slide } from "svelte/transition";
    import { getDB } from "$lib/db";
    import { getChannels } from "$lib/db/channel";
    import { settingsStore } from "$lib/settings/store";
    import Channel from "./Channel.svelte";
    import SideBarOption from "./SideBarOption.svelte";
    import ChannelFormDialog from "components/channel/ChannelFormDialog.svelte";

    const {
        elements: { content, item, trigger },
        helpers: { isSelected },
    } = createAccordion({
        defaultValue: "item-1",
    });
    async function getAccordionData() {
        const db = await getDB();

        // const c = await createChannel(db, {
        //     url: "/hello/elf",
        //     name: "this is name",
        //     iconPath: "hello/",
        //     itemCount: 0,
        //     itemUnreadCount: 0,
        // });
        // console.log(c);

        const channels = await getChannels(db);

        const data = [
            {
                id: "item-1",
                title: "Channels",
                items: channels,
            },
        ];
        return data;
    }
</script>

{#if $settingsStore.workingFolder}
    {#await getAccordionData() then data}
        {#each data as { id, title, items }}
            <li use:melt={$item(id)}>
                <button
                    use:melt={$trigger(id)}
                    class="flex justify-between w-full align-middle group font-semibold text-gray-900">
                    {title}
                    <div
                        class="my-auto group-aria-expanded:rotate-90 transition-transform duration-300">
                        <ChevronRight size={16} />
                    </div>
                </button>
            </li>
            {#if $isSelected(id)}
                {#each items as channel}
                    <li use:melt={$content(id)} transition:slide>
                        <Channel {channel} />
                    </li>
                {/each}
            {/if}
        {/each}
        <li>
            <ChannelFormDialog />
        </li>
    {/await}
{/if}
<SideBarOption />

<style lang="postcss">
    button.item {
        @apply block w-full rounded text-start px-2 py-0.5;
        @apply text-gray-700;
        @apply aria-expanded:bg-gray-800 aria-expanded:text-gray-200;
    }
</style>
