import { Terminal } from '@xterm/xterm';

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
    help: () => {
        term.write('\r\n[Available Commands]\r\n - help  : Show this message\r\n - clear : Clear terminal');
    },
    clear: () => {
        term.clear();
    }
}

// 入力された文字列をためておく変数
let currentLine = "";

// 入力を監視するリスナー
term.onData(data => {

    // エンター（改行コード）が押されたとき
    if(data === "\r") {

        const command = currentLine.trim();

        if(command in commands) {
            commands[command]();
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