import type { Item, RawItem } from "$lib/types/item";
import { getDB } from ".";

export async function getItem(channelID: number) {
    const db = await getDB()
    const result = await db.select<Item[]>(`SELECT * FROM item WHERE channel_id = $1`, [channelID]);

    return result
}

export async function createItem(item: RawItem) {
    const db = await getDB()
    const fields = Object.keys(item)
    console.log(item);
    console.log(`INSERT INTO item (${fields.join(",")})
    VALUES (${Array.from(fields, () => "?").join(",")})
    RETURNING *`);
    console.log(Object.values(item));



    const result = await db.select<Item[]>(`INSERT INTO item(${fields.join(",")})
    VALUES(${Array.from(fields, () => "?").join(",")})
    RETURNING *`, Object.values(item))

    return result[0]
}