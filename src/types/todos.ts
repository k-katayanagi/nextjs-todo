
export interface Todos {
    id: number;
    title: string;
    content: string;
    status: "0:未完了"|"1:進行中"|"2:完了";
    created_at: string;
}

export type sortStatus = "すべて"|"未完了"|"進行中"|"完了"
export type status = "未完了"|"進行中"|"完了"
export type orderItem = "id昇順"|"id降順"|"タイトル昇順"|"タイトル降順"|"内容昇順"|"内容降順"|"ステータス昇順"|"ステータス降順"|"登録日昇順"|"登録日降順"

