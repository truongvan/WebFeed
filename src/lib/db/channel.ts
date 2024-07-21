import type Database from "@tauri-apps/plugin-sql";
import { getDB } from ".";

export interface CreateChannel {
    url: string;            // TEXT NOT NULL UNIQUE
    name: string;           // TEXT NOT NULL UNIQUE
    created_at?: number;    // INTEGER (optional, as it's not marked NOT NULL)
    updated_at?: number;    // INTEGER (optional, as it's not marked NOT NULL)
    iconPath: string;       // TEXT NOT NULL
    itemCount: number;      // INTEGER NOT NULL
    itemUnreadCount: number;// INTEGER NOT NULL
}

export interface Channel extends CreateChannel {
    id: number;             // INTEGER PRIMARY KEY AUTOINCREMENT
}


export async function getChannels() {
    const db = await getDB()
    const result = await db.select<Channel[]>(`SELECT id,url,name,created_at,updated_at,iconPath,itemCount,itemUnreadCount
    FROM channel;
    `)
    return result
}

export async function deleteChannel(channelID: number) {
    const db = await getDB()
    const result = await db.execute(`DELETE FROM channel WHERE id = $1`, [channelID])
    return result
}

export async function createChannel(channel: CreateChannel) {
    const db = await getDB()
    const fields = ["url", "name", "created_at", "updated_at", "iconPath", "itemCount", "itemUnreadCount"]
    if (channel.created_at === undefined) {
        channel.created_at = Date.now()
    }
    if (channel.updated_at === undefined) {
        channel.updated_at = Date.now()
    }
    const result = await db.select<Channel[]>(`INSERT INTO channel (${fields.join(",")})
    VALUES (${Array.from(fields, () => "?").join(",")})
    RETURNING ${["id", ...fields].join(",")}
    ;`, [
        channel.url, channel.name, channel.created_at, channel.updated_at, channel.iconPath, channel.itemCount, channel.itemUnreadCount
    ])
    return result[0]
}