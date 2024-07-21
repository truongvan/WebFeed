export interface Item extends RawItem {
    id: number

}
export interface RawItem {
    channel_id: number
    title: string
    full_content: string | null
    link: string
    description: string
    created_at: number
    published_at: number | null
    read_at: number | null
    hidden_at: number | null
}