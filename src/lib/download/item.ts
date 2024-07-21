import { createChannel, type Channel, type CreateChannel } from "$lib/db/channel";
import { createItem } from "$lib/db/item";
import type { Item, RawItem } from "$lib/types/item";
import { extractFromXml, type FeedEntry } from "@extractus/feed-extractor";
import { invoke } from "@tauri-apps/api/core";

export async function feedChannel(channel: Channel, feedEntries: FeedEntry[] | undefined = undefined) {
    let items: Item[] = []
    if (!feedEntries) {
        const feed = await invoke<{
            data: string;
            type: string;
            status: number;
            content_type: string;
        }>("get_feed", { url: channel.url });

        if (feed.type === "xml") {
            const result = extractFromXml(feed.data);
            feedEntries = result.entries
        }
    }
    if (!feedEntries) {
        feedEntries = []
    }

    for (const entry of feedEntries) {
        const item: RawItem = {
            title: entry.title || "",
            full_content: null,
            channel_id: channel.id,
            link: entry.link || "",
            description: entry.description || "",
            created_at: Date.now(),
            published_at: entry.published
                ? Date.parse(entry.published)
                : null,
            read_at: null,
            hidden_at: null,
        };
        let i = await createItem(item);
        items.push(i)
    }

    return items
}