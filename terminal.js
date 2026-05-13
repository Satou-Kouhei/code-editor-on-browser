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

term.onData(data => {
  if(data === "\r") {
    term.write("\r\n$");
  } else if(data === "\x7F") {
    term.write("\b \b");
  } else {
    term.write(data);
  }
});