
export interface Todos {
    id: number;
    title: string;
    content: string;
    status: "未完了"|"進行中"|"完了";
    created_at?: string;
}

export type sortStatus = "すべて"|"未完了"|"進行中"|"完了"
export type status = "未完了"|"進行中"|"完了"

