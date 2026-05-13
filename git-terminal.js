import { fetchRepositoryContents } from './github-api.js';

/**
 * gitコマンドの入力を処理する関数
 */
export async function executeGitCommand(term, args) {

    // gitだけ入力したとき(後ろに何もつけなかったとき)
    if(args.length === 0) {
        term.write("\r\nusage: git <command> [<args>]");
        term.write("\r\n\r\nAvailable commands:\r\n  clone    Clone a repository");
        return;
    }

    // サブコマンド(cloneなど)を取り出す
    const subCommand = args[0];

    // コマンド処理
    if(subCommand === "clone") {
        const repoPath = args[1];
        // 第三引数にフォルダ名が指定されていれば、さらにそれを取得する
        const targetPath = args[2] || "";

        if(repoPath.startsWith("http://") || repoPath.startsWith("https://")) {
            if (repoPath.endsWith('.git')) {
                repoPath = repoPath.slice(0, -4);
            }

            const urlPath = repoPath.replace(/\s/, "").split("/");
            const repo = urlPath.pop();
            const owner = urlPath.pop();
            repoPath = `${owner}/${repo}`;
        }


        // バリデーション：　引数があるか、スラッシュが含まれるか
        if(!repoPath || !repoPath.includes("/")) {
            term.write('\r\nUsage: git clone <username>/<repository>');
            return;
        }

        const [owner, repo] = repoPath.split("/");

        if(targetPath) {
            term.write(`\r\nFetching contents of '${targetPath}' from '${repo}'...`);
        } else {
            term.write(`\r\nCloning into '${repo}'...`);
        }

        try {
            // github api の呼び出し(トークンは一旦空)
            const data = await fetchRepositoryContents(owner, repo, targetPath, "");

            // つなぎこみテスト
            term.write('\r\n--- Remote Files ---');

            // データが配列か確認
            if(Array.isArray(data)){
                data.forEach(item => {
                    const marker = item.type === 'tree' ? '[DIR] ' : '      ';
                    term.write(`\r\n${marker}${item.path}`);
                });
            } else {
                term.write(`\r\n[FILE] ${data.name || 'Unknown Item'}`);
            }
            term.write('\r\n--------------------');

        } catch(error) {
            term.write(`\r\nError: Fetch failed. (${error.message})`);
        }

    } else {
        // サポート外のサブコマンド
        term.write(`\r\nUnknown git subcommand: ${subCommand}`);
    }
}