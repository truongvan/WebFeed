<script lang="ts">
    import { Menu, MenuItem } from "@tauri-apps/api/menu";
    let showDialog = false;
    async function createMenu() {
        const newOption = await MenuItem.new({
            text: "New Channel",
            action: () => {
                console.log("hello");
                showDialog = !showDialog;
            },
        });
        const menu = await Menu.new({
            items: [newOption],
        });
        return menu;
    }
</script>

<li
    class="flex-grow h-full"
    on:contextmenu|preventDefault={async () => {
        const menu = await createMenu();
        menu.popup();
    }}
></li>
