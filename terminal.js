import { Terminal } from '@xterm/xterm';
import { executeGitCommand } from './git-terminal.js';

// ターミナルを表示するHTML要素を取得する
const terminalElement = document.getElementById('terminal');

// ターミナルを起動する
const term = new Terminal({
    corsorBlink: true,
    rows: 10,
    cols: 80,
    thema: {
        background: '#1e1e1e'
    }
});

term.open(terminalElement);
term.writeln("terminal on BROWSER!")
term.write("$ ");

// コマンド一覧
const commands = {
    help: (term) => {
        term.write('\r\n[Available Commands]\r\n - help  : Show this message\r\n - clear : Clear terminal');
    },
    clear: (term) => {
        term.clear();
    },
    git: async (term, args) => {
        await executeGitCommand(term, args);
    }
}

// 入力された文字列をためておく変数
let currentLine = "";

// 入力を監視するリスナー
term.onData(data => {

    // エンター（改行コード）が押されたとき
    if(data === "\r") {

        const line = currentLine.trim();

        // 入力した文字列をスペースで分割する
        const parts = line.split(/\s+/);
        const command = parts[0];
        const args = parts.slice(1);

        if(command in commands) {
            commands[command](term, args);
        }
        else if(command !== "") {
            term.write(`\r\nCommand not found: ${command}`);
        }

        // エンターしたらcurrentLineを空にする
        currentLine = "";

        term.write("\r\n$ ");
    }
    
    // バックスペース（デリートコード）が押されたとき
    else if(data === "\x7F") {
        if(currentLine.length > 0) {
            currentLine = currentLine.slice(0, -1);
            term.write("\b \b");
        }
    }

    // それ以外の通常の入力のとき
    else {
        currentLine += data;
        term.write(data);
    }
});