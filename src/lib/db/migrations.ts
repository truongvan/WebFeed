import type Database from "@tauri-apps/plugin-sql";
import { getDB } from ".";

const migrations = `CREATE TABLE IF NOT EXISTS channel (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL UNIQUE,
    created_at INTEGER,
    updated_at INTEGER,
    iconPath TEXT NOT NULL,
    itemCount INTEGER NOT NULL,
    itemUnreadCount INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS item (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    channel_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    full_content TEXT NULL,
    link TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at INTEGER,
    published_at INTEGER NULL,
    read_at INTEGER NULL,
    hidden_at INTEGER NULL,
    FOREIGN KEY(channel_id) REFERENCES channel(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS icons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL UNIQUE,
    image_path TEXT NOT NULL UNIQUE,
    size INTEGER NOT NULL
);`

export async function migrate() {
    const db = await getDB()
    db.execute(migrations)
}