[to TopPage](../README.md)
# 02_コースの進め方

## 講座一覧
- [003_Udemyでの学習の進め方](#003_Udemyでの学習の進め方)
- [004_★重要★資材のダウンロード＋受講準備](#004_★重要★資材のダウンロード＋受講準備)
- [005_★重要★コースで使用するVSCodeの拡張機能を準備しよう](#005_★重要★コースで使用するVSCodeの拡張機能を準備しよう)
- [006_VSCodeのショートカットの使い方について学ぼう](#006_VSCodeのショートカットの使い方について学ぼう)
- [007_ChatGPTで疑問を解決しよう！！](#007_ChatGPTで疑問を解決しよう！！)

## 003_Udemyでの学習の進め方
[toTop](#)
- Udemyサイトの解説

## 004_★重要★資材のダウンロード＋受講準備
[toTop](#)
- `react-guide-material.zip`ファイルで全講座のソースコードを確認できる

## 005_★重要★コースで使用するVSCodeの拡張機能を準備しよう
[toTop](#)
- VScodeのおすすめの拡張機能を紹介
### Prettier - Code formatter ★  
- `esbenp.prettier-vscode`
  * 様々な言語の整形を行ってくれる  

### Live Server ★  
- `ritwickdey.LiveServer`  
  * 簡易的なサーバーを簡単に起動することができる

### Auto Rename Tag  
- `formulahendry.auto-rename-tag`  
  * 開始タグを編集すると、閉じタグを自動的に変更してくれる

### ES7+ React/Redux/React-Native    
- `dsznajder.es7-react-js-snippets`  
  * Reactのスニペット(ショートカット)を使えるようにする

## 006_VSCodeのショートカットの使い方について学ぼう
[toTop](#)

- 参考ファイル：[vscode shortcut](../00_references/vscode_shortcuts.html)

## 007_ChatGPTで疑問を解決しよう！！
[toTop](#)

- 追加コンテンツ：
- 困ったらひとまずChatGPTに聞いてみよう！
### ChatGPTを使ってみよう！
1. [こちらのリンク](https://chat.openai.com/auth/login)画面中心のLog inボタンをクリック！
2. ログインするとChat画面が表示されます。
3. 画面下部の入力欄に質問を入力してみよう！
  * するとChatGPTからの回答が得られます。

### ChatGPTを用いたエラーの修正方法！
1. 開発ツールでエラーを確認しよう
```
Uncaught SyntaxError: missing ) after argument list
```
2. ChatGPTに質問しよう
```
console.log(Hello World!);
を実行すると
Uncaught SyntaxError: missing ) after argument list
というエラ ー 文が表示されました。
工ラーの解決方法と意味について教えてください。
```
3. ChatGPTの回答：
```
表示されたエラーメッセージ "UncaughtSyntaxError: missing ) afterargument list" は、JavaScriptの構文工ラーを示しています。
具体的には、引数リストの後ろに閉じ括弧ツが不足していることを意味しています。以下のように修正してください:
console.log("Hello World!");

修正後のコ ー ドでは、テキスト "HelloWorld!" を引用符で囲んでいます。
Javascriptでは、引用符で囲まれたテキストは文字列として扱われます。
```

### 困ったらひとまずChatGPTに聞いてみよう！
- 以下をマウスホバー時に色が変わるボタンとして作成してみましたがなぜか動きません。
  * こんな時はChatGPTに解決策を丸投げしてみましょう！

### おまけ. ChatGPTでコードの実装！
- ChatGPTにコードの記述をお願いしてみるといい感じのコードを返してくれるかもしれません。
  * 新しいコードを書くときに迷った時は是非試してみてください😄
- Q．
```
以下の項目を満たす`button`要素をhtmlファイルとcssファイルを作成してください。
・背景の色は白色
・文字の色は黒色
・文字の上下左右にの余白
・ボーダーは`1px solid 黒`
・マウスホバ ー 時に 0.3 秒かけて背景が黒に文字が白に変化する
```
#### A. 回答例：
HTMLファイルとCSSファイルを以下に示します。これは、指定された要件に基づいて`button`要素を作成した例です。

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Button Example</title>
</head>
<body>

<button class="custom-button">Click me</button>

</body>
</html>
```

**styles.css:**

```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
}

.custom-button {
    background-color: #ffffff;
    color: #000000;
    padding: 10px 20px;
    margin: 10px;
    border: 1px solid #000000;
    transition: background-color 0.3s, color 0.3s;
}

.custom-button:hover {
    background-color: #000000;
    color: #ffffff;
}
```

この例では、`button`要素に`custom-button`というクラスを追加し、CSSでそれに対するスタイルを定義しています。ボタンをクリックすると、背景が白色で文字が黒色で表示され、マウスホバー時には指定されたアニメーションが発生して背景が黒色で文字が白色に変化します。
