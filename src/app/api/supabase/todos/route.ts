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


export const getTOrderTodos = async (orderItem: string): Promise<Todos[]> => {
    try {
    const columnMap: Record<string, string> = {
        "id": "id",
        "タイトル": "title",
        "内容": "content",
        "ステータス": "status",
        "登録日": "created_at",
    };

    const match = orderItem.match(/^(.*)(昇順|降順)$/);
    if (!match) {
        throw new Error("Invalid orderItem format");
    }

    const [, columnName, orderDirection] = match;
    const column = columnMap[columnName];
    const ascending = orderDirection === "昇順";

    if (!column) {
        throw new Error(`Unknown column name: ${columnName}`);
    }

      // Supabaseからデータを取得
    const { data, error } = await supabase
        .from("Todos")
        .select("*")
        .order(column, { ascending });

    if (error) {
        console.error("Error fetching todos:", error);
        throw error;
    }
    return data || [];

    } catch (error) {
        console.error("Error in getTOrderTodos:", error);
        throw error;
    }
  };

export const addTodos = async (addTodo:{title: string; content: string; status: string }) => {
    try {
         // Supabaseにデータ挿入
        const {title,content,status} = addTodo
        const {data,error} = await supabase.from('Todos').insert({ title:title,content:content,status:status}).select();
        // Supabaseエラーのハンドリング
        if (error) {
            console.error("Error fetching todos:", error.message);
            throw new Error(error.message);
        }

        // 挿入したデータが返ってくることを期待
        if (!data || data.length === 0) {
            throw new Error("Failed to insert new todo");
        }

        // 正常なレスポンス
        return data[0]; // 挿入された最初のTODOを返す

    } catch (err) {
        // 予期しないエラーをキャッチ
        console.error("Unexpected error:", err);
        throw new Error("An unexpected error occurred");
    }
};

export const deleteTodos = async (id: number) => {
    try {
        // Supabaseでデータを削除
        const { data, error } = await supabase
            .from('Todos')
            .delete()  // 削除するメソッドを使用
            .eq('id', id)// 削除するレコードのidを指定
            .select()

        // Supabaseエラーのハンドリング
        if (error) {
            console.error("Error deleting todo:", error.message);
            throw new Error(error.message);
        }

        // 削除が成功したか確認
        if (!data || data.length === 0) {
            throw new Error("Failed to delete todo");
        }

        // 正常なレスポンス
        return data[0]; // 削除された最初のTODOを返す

    } catch (err) {
        // 予期しないエラーをキャッチ
        console.error("Unexpected error:", err);
        throw new Error("An unexpected error occurred");
    }
};


export const updateTodos = async (id: number, updatedData: { title: string; content: string; status: string }) => {
    try {
      // Supabaseでデータを更新
      const { data, error } = await supabase
        .from('Todos')
        .update(updatedData)  // 更新するデータを指定
        .eq('id', id)  // 更新するレコードのidを指定
        .select();
  
      // Supabaseエラーのハンドリング
      if (error) {
        console.error("Error updating todo:", error.message);
        throw new Error(error.message);
      }
  
      // 更新が成功したか確認
      if (!data || data.length === 0) {
        throw new Error("Failed to update todo");
      }
  
      // 正常なレスポンス
      return data[0]; // 更新されたTODOを返す
  
    } catch (err) {
      // 予期しないエラーをキャッチ
      console.error("Unexpected error:", err);
      throw new Error("An unexpected error occurred");
    }
  };


