
export interface Todos {
    id: number;
    title: string;
    content: string;
    status: "未完了"|"進行中"|"完了";
    created_at?: string;
}
