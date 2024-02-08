import type Database from "@tauri-apps/plugin-sql";

export interface Channel {
    id?: number;             // INTEGER PRIMARY KEY AUTOINCREMENT
    url: string;            // TEXT NOT NULL UNIQUE
    name: string;           // TEXT NOT NULL UNIQUE
    created_at?: number;    // INTEGER (optional, as it's not marked NOT NULL)
    updated_at?: number;    // INTEGER (optional, as it's not marked NOT NULL)
    iconPath: string;       // TEXT NOT NULL
    itemCount: number;      // INTEGER NOT NULL
    itemUnreadCount: number;// INTEGER NOT NULL
}


export async function getChannels(db: Database) {
    const result = await db.select<Channel[]>(`SELECT id,url,name,created_at,updated_at,iconPath,itemCount,itemUnreadCount
    FROM channels;
    `)
    return result
}

export async function createChannel(db: Database, channel: Channel) {
    const fields = ["url", "name", "created_at", "updated_at", "iconPath", "itemCount", "itemUnreadCount"]
    if (channel.created_at === undefined) {
        channel.created_at = Date.now()
    }
    if (channel.updated_at === undefined) {
        channel.updated_at = Date.now()
    }
    const result = await db.select<Channel>(`INSERT INTO channels (${fields.join(",")})
    VALUES (${Array.from(fields, () => "?").join(",")})
    RETURNING ${fields.join(",")}
    ;`, [
        channel.url, channel.name, channel.created_at, channel.updated_at, channel.iconPath, channel.itemCount, channel.itemUnreadCount
    ])
    return result
}