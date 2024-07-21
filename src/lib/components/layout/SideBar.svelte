<script lang="ts">
    import { channelsStore } from "$lib/stores/channel";
    import { createAccordion, melt } from "@melt-ui/svelte";
    import ChannelFormDialog from "components/channel/ChannelFormDialog.svelte";
    import { ChevronRight } from "lucide-svelte";
    import Channel from "./Channel.svelte";
    import SideBarOption from "./SideBarOption.svelte";

    const {
        elements: { content, item, trigger },
        helpers: { isSelected },
    } = createAccordion({
        defaultValue: "channel",
    });

    const accordions = [
        {
            id: "channel",
            name: "Chanels",
        },
        {
            id: "item",
            name: "Items",
        },
    ];
</script>

{#each accordions as accordion}
    <li use:melt={$item(accordion.id)}>
        <button
            use:melt={$trigger(accordion.id)}
            class="flex justify-between w-full align-middle group font-semibold text-gray-900"
        >
            <div>{accordion.name}</div>
            <div
                class="my-auto group-aria-expanded:rotate-90 transition-transform duration-300"
            >
                <ChevronRight size={16} />
            </div>
        </button>
    </li>
    {#if $isSelected(accordion.id)}
        {#if accordion.id === "channel"}
            {#each $channelsStore as channel}
                <Channel {channel} />
            {/each}
        {/if}
    {/if}
{/each}
<li>
    <ChannelFormDialog />
</li>

<SideBarOption />

<style lang="postcss">
    button.item {
        @apply block w-full rounded text-start px-2 py-0.5;
        @apply text-gray-700;
        @apply aria-expanded:bg-gray-800 aria-expanded:text-gray-200;
    }
</style>
