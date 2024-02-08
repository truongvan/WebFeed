<script lang="ts">
    import { Menu, MenuItem, PredefinedMenuItem } from "@tauri-apps/api/menu";
    import { confirm } from "@tauri-apps/plugin-dialog";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let active = false;
    export let name: string;
    let _menu: Menu | null = null;
    export let ondblclick = (e: MouseEvent) => {};

    async function getMenu() {
        if (_menu) {
            return _menu;
        }

        const deleteOption = await MenuItem.new({
            text: "Delete...",
            action: async () => {
                const confirmation = await confirm("", {
                    title: "This action cannot be reverted. Are you sure?",
                    type: "warning",
                    okLabel: "Delete",
                });
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
    aria-current={active}
    on:dblclick={ondblclick}
    on:click={() => {
        active = true;
        dispatch("active");
    }}
    on:contextmenu|preventDefault={async () => {
        active = true;
        dispatch("active");
        const menu = await getMenu();
        menu.popup();
    }}>
    {name}
</button>

<style lang="postcss">
    button {
        @apply block w-full rounded text-start px-3 py-0.5 border-solid border-primary-300;
        @apply text-primary-700;
        @apply select-none;
        @apply aria-[current='true']:bg-primary-800 aria-[current='true']:text-primary-200;
    }
</style>
