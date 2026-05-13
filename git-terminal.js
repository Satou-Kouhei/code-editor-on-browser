import git from 'isomorphic-git';
import FS from '@isomorphic-git/lightning-fs';

// 仮想ドライブ（ファイルシステム）の初期化
const fs = new FS("browser-fs");
const dir = "/src";

/**
 * 
 * @param {Terminal} term - xterm.jsのインスタンス
 * @param {string[]} args - 入力した引数の配列
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

    if(subCommand === "clone") {
        term.write("\r\nCloning repository...");
    } else {
        term.write(`\r\nUnknown git command: ${subCommand}`);
    }
}