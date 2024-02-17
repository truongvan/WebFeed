<script lang="ts">
    import { getDB } from "$lib/db";
    import { createChannel, type Channel } from "$lib/db/channel";
    import { extractFromXml } from "@extractus/feed-extractor";
    import { createDialog, melt } from "@melt-ui/svelte";
    import { invoke } from "@tauri-apps/api/core";
    import { Plus, X } from "lucide-svelte";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    let url: string = "https://developer.mozilla.org/en-US/blog/rss.xml";
    let name: string | undefined;

    const {
        elements: {
            trigger,
            overlay,
            content,
            title,
            description,
            close,
            portalled,
        },
        states: { open },
    } = createDialog({
        forceVisible: true,
    });

    onMount(() => {
        const i = document.querySelector<HTMLInputElement>("#input");
        if (i) {
            i.focus();
        }
    });

    async function handleSubmit() {
        const feed = await invoke<{
            data: string;
            type: string;
            status: number;
            content_type: string;
        }>("get_feed", { url });

        if (feed.type === "xml") {
            const result = extractFromXml(feed.data);
            name = name || result.title;

            if (result.entries && name) {
                const iconPath = await invoke<string>("download_favicon", {
                    url,
                    name,
                    size: 512,
                });
                const channel: Channel = {
                    url,
                    name,
                    itemCount: result.entries.length,
                    itemUnreadCount: result.entries.length,
                    iconPath,
                };
                const db = await getDB();
                createChannel(db, channel);
            }
        }
    }
</script>

<button
    use:melt={$trigger}
    class="w-full inline-flex items-center justify-center rounded font-semibold-none shadow"
>
    <Plus />
</button>

<div class="" use:melt={$portalled}>
    {#if $open}
        <div
            use:melt={$overlay}
            class="fixed inset-0 z-50 bg-black/50"
            transition:fade={{ duration: 150 }}
        />
        <div
            class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
              max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white
              p-6 shadow-lg"
            use:melt={$content}
        >
            <h2 use:melt={$title} class="m-0 text-lg font-medium text-black">
                Channel
            </h2>

            <fieldset class="mb-4 flex items-center gap-5">
                <label class="w-12 text-right text-black" for="url">
                    URL
                </label>
                <input
                    required
                    bind:value={url}
                    placeholder="https://developer.mozilla.org/en-US/blog/rss.xml"
                    class="inline-flex h-8 w-full flex-1 items-center justify-center rounded-sm border border-solid px-3 leading-none text-black"
                    id="url"
                />
            </fieldset>
            <fieldset class="mb-4 flex items-center gap-5">
                <label class="w-12 text-right text-black" for="name">
                    Name
                </label>
                <input
                    bind:value={name}
                    placeholder="MDN Blog"
                    class="inline-flex h-8 w-full flex-1 items-center justify-center rounded-sm border border-solid px-3 leading-none text-black"
                    id="name"
                />
            </fieldset>
            <div class="mt-6 flex justify-end gap-4">
                <button
                    use:melt={$close}
                    class="inline-flex h-8 items-center justify-center rounded
              bg-zinc-100 px-4 font-medium leading-none text-zinc-600 hover:bg-zinc-200 active:bg-zinc-300"
                >
                    Cancel
                </button>
                <button use:melt={$close} on:m-click={handleSubmit} class="btn">
                    Save changes
                </button>
            </div>
            <button
                use:melt={$close}
                aria-label="close"
                class="absolute right-4 top-4 inline-flex h-6 w-6 appearance-none
          items-center justify-center rounded-full p-1 text-gray-800
          hover:bg-gray-100 focus:shadow-gray-400"
            >
                <X class="square-4" />
            </button>
        </div>
    {/if}
</div>
