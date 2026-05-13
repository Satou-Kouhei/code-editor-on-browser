// モジュールをインポート（CDN)
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';


// エディターを表示するHTML要素を取得する
const editorElement = document.getElementById("editor");

// エディターを初期化する

const view = new EditorView({
    doc: "// Hello CodeMirror\nconsole.log('Success!');",
    extensions: [
      basicSetup,
      javascript()
    ],
    parent: editorElement
  });
