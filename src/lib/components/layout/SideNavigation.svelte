<script lang="ts">
    import ResizeBar from "./ResizeBar.svelte";
    import { menuSizeStore } from "./store";
</script>

<div class="flex flex-row h-full w-full overflow-hidden bg-gray-100 relative">
    <ResizeBar />
    <div
        class:transition-all={$menuSizeStore.closed}
        class="h-full overflow-x-hidden bg-gray-200 w-[var(--data-menu-size)] border-r border-r-gray-300 flex-shrink-0 pt-7"
        style:--data-menu-size="{$menuSizeStore.size}px">
        <slot name="menu" />
    </div>
    <div class="h-ful overflow-y-auto p-6">
        <slot name="body" />
    </div>
</div>
