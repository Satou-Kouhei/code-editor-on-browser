/**
 * GitHubから指定したリポジトリのルートディレクトリのファイル一覧を取得する関数
 * @param {string} owner - リポジトリの所有者（ユーザー名または組織名）
 * @param {string} repo - リポジトリ名
 * @param {string} [token] - パーソナルアクセストークン（公開リポジトリなら空でも可）
 */
export async function fetchRepositoryContents(owner, repo, token = "") {
    // GitHub APIのURL（ルート直下のファイル一覧を取得）
    const url = `https://api.github.com/repos/${owner}/${repo}/contents`;
    // 認証トークンがある場合はヘッダーに設定
    const headers = {};
    if (token) {
        headers["Authorization"] = `token ${token}`;
    }

    try {
        const response = await fetch(url, { headers });

        if (!response.ok) {
            throw new Error(`HTTPエラー! ステータス: ${response.status}`);
        }

        // JSON形式でデータを受け取る
        const data = await response.json();
        
        // ファイル情報の一覧を返す
        return data;

    } catch (error) {
        console.error("GitHub APIとの通信に失敗しました:", error);
        throw error;
    }
}