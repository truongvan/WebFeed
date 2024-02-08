<script lang="ts">
    import { DEFAULT_SIZE, menuSizeStore } from "./store";

    function resizeAction(node: HTMLButtonElement, minimumValue = 0) {
        let previousX = 0;
        function trackMousePosition(e: MouseEvent) {
            if (e.buttons == 0) {
                removeTrack();
                return;
            }
            const rangeXMouse = e.x - previousX;
            previousX = e.x;

            let resize = $menuSizeStore.size + rangeXMouse;
            if (resize < 5 && rangeXMouse < 0) {
                resize = 0;
            }
            menuSizeStore.setSize(resize);
        }
        function removeTrack() {
            document.body.removeEventListener("mousemove", trackMousePosition);
        }
        node.addEventListener("mousedown", (e: MouseEvent) => {
            previousX = e.x;
            document.body.addEventListener("mousemove", trackMousePosition);
            document.body.addEventListener("mouseup", removeTrack, {
                once: true,
            });
        });
    }
</script>

<button
    style:--position="{$menuSizeStore.size}px"
    use:resizeAction={DEFAULT_SIZE}
    class:transition-all={$menuSizeStore.closed}
    class="absolute align-middle w-1 h-full -translate-x-1/2 left-[var(--position)] cursor-col-resize active:w-10">
    <span
        class="absolute -translate-y-1/2 translate-x-1 h-24 w-1 bg-gray-300 rounded-lg">
    </span>
</button>
