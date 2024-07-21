<script lang="ts">
    import { deleteChannel } from "$lib/db/channel";
    import { Menu, MenuItem, PredefinedMenuItem } from "@tauri-apps/api/menu";
    import { confirm } from "@tauri-apps/plugin-dialog";
    import { convertFileSrc } from "@tauri-apps/api/core";
    import { currentChannel } from "$lib/stores/channel";

    export let name: string;
    export let iconPath: string;
    export let channelID: number | undefined;
    export let handleActive: () => void;
    export let handleDblclick = (e: MouseEvent) => {};
    export let handleDelete: () => void;

    let _menu: Menu | null = null;

    async function getMenu() {
        if (_menu) {
            return _menu;
        }

        const deleteOption = await MenuItem.new({
            text: "Delete...",
            action: async () => {
                const confirmation = await confirm("", {
                    title: "This action cannot be reverted. Are you sure?",
                    okLabel: "Delete",
                });
                if (confirmation && channelID) {
                    deleteChannel(channelID);
                    handleDelete();
                }
            },
        });
        const editOption = await MenuItem.new({
            text: "Edit",
            action: async () => {},
        });
        const separator = await PredefinedMenuItem.new({
            item: "Separator",
        });

        _menu = await Menu.new({
            items: [editOption, separator, deleteOption],
        });
        return _menu;
    }
</script>

<button
    aria-current={$currentChannel && $currentChannel.id === channelID}
    on:dblclick={handleDblclick}
    on:click={() => {
        handleActive();
    }}
    on:contextmenu|preventDefault={async () => {
        handleActive();
        const menu = await getMenu();
        menu.popup();
    }}
>
    <div class="flex items-center gap-x-1">
        <div>
            <img src={convertFileSrc(iconPath)} alt="" />
        </div>
        <div>
            {name}
        </div>
    </div>
</button>

<style lang="postcss">
    button {
        @apply block w-full rounded text-start px-3 py-0.5 border-solid border-primary-300;
        @apply text-primary-700;
        @apply select-none;
        @apply aria-[current='true']:bg-primary-800 aria-[current='true']:text-primary-200;
    }
</style>
