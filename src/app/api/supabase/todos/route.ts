import { supabase } from "@/lib/supabase";
import { Todos } from "@/types/todos";


export const getTodos = async ():Promise<Todos[]> => {
    try {
        // Supabaseからデータを取得
        const { data, error } = await supabase.from("Todos").select("*");

        // Supabaseエラーのハンドリング
        if (error) {
            console.error("Error fetching todos:", error.message);
            throw new Error(error.message);
        }

        // データが存在しない場合
        if (!data) {
            return [];
        }

        // 正常なレスポンス
        return data
    } catch (err) {
        // 予期しないエラーをキャッチ
        console.error("Unexpected error:", err);
        throw new Error("An unexpected error occurred");
    }
};
