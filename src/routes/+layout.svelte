<script lang="ts">
    import SideNavigation from "$lib/components/layout/SideNavigation.svelte";

    import { FolderOpen, PanelLeft } from "lucide-svelte";
    import Icon from "elements/Icon.svelte";
    import { DEFAULT_SIZE, menuSizeStore } from "components/layout/store";
    import { handleSelectWorkingFolder } from "$lib/settings/handles";
    import "../app.css";
    import SideBar from "components/layout/SideBar.svelte";
    import { onMount } from "svelte";
    import { settingsStore } from "$lib/settings/store";
    onMount(() => {
        settingsStore.load();
    });
</script>

<main class="h-screen flex flex-col bg-white relative">
    <div class="h-7 flex pl-16 absolute bg-transparent left-0 right-0 z-50">
        <div class="my-auto">
            <Icon
                onclick={() => {
                    if ($menuSizeStore.size == 0) {
                        menuSizeStore.setSize(DEFAULT_SIZE);
                    } else {
                        menuSizeStore.setSize(0);
                    }
                }}>
                <PanelLeft size="16" />
            </Icon>
        </div>
        <div class="my-auto">
            <Icon
                onclick={() => {
                    handleSelectWorkingFolder();
                }}>
                <FolderOpen size="16" />
            </Icon>
        </div>
    </div>
    <SideNavigation>
        <ul slot="menu" class="p-3 flex flex-col h-full gap-1">
            <SideBar />
        </ul>
        <svelte:fragment slot="body">
            <slot />
        </svelte:fragment>
    </SideNavigation>
</main>
