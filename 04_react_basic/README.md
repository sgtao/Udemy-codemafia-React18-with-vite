[to TopPage](../README.md)
# 04_まずはReactに触れてみよう

## 講座一覧
- [022_Reactを動かしてみよう](#022_reactを動かしてみよう)
- [023_Reactコンポーネントって何？コンポーネントを定義してみよう](#023_reactコンポーネントって何コンポーネントを定義してみよう)
- [024_Reactのプロジェクトの作成方法（create−react−appの使い方）](#024_reactのプロジェクトの作成方法create−react−appの使い方)
- [025_★重要★本コースで使用するプロジェクトの使い方](#025_★重要★本コースで使用するプロジェクトの使い方)
- [026_コンポーネントにスタイルを当ててみよう](#026_コンポーネントにスタイルを当ててみよう)
- [027_コンポーネントの分割方法](#027_コンポーネントの分割方法)
- [028_【練習】コンポーネントの分割方法](#028_【練習】コンポーネントの分割方法)
- [029_不要なタグを出力しないFragmentの使い方](#029_不要なタグを出力しないfragmentの使い方)
- [030_JSX内でJSコードを実行してみよう](#030_jsx内でjsコードを実行してみよう)
- [031_【TIPS】式と文の違い](#031_tips式と文の違い)
- [032_【練習】JSX内で式を使ってみよう](#032_練習jsx内で式を使ってみよう)
- [033_propsでコンポーネントに値を渡してみよう](#033_propsでコンポーネントに値を渡してみよう)
- [034_propsに色々な値を渡してみよう](#034_propsに色な値を渡してみよう)
- [035_【練習＆解答】propsで値を渡してみよう](#035_練習＆解答propsで値を渡してみよう)
- [036_特別なプロパティ：props．children](#036_特別なプロパティpropschildren)
- [037_propsの重要なルール](#037_propsの重要なルール)
- [038_JSXの正体](#038_jsxの正体)
- [039_React要素ツリーとコンポーネントツリー](#039_react要素ツリーとコンポーネントツリー)
- [040_セクションまとめ](#040_セクションまとめ)


## 022_Reactを動かしてみよう
[toTop](#)
- HTML内でReactを使う方法を紹介
  - libraryの`react.development.js`・`react-dom.development.js`・`babel-standalone.js`を読み込む
  - VS Codeの`Live Server`で[サイトを開く](http://127.0.0.1:5500/04_react_basic/extra_src/01_run_react/end/)

### ソース
- [end source](./extra_src/01_run_react/end//index.html)
```html
<!DOCTYPE html>
<html>
<head>
   <script src="/.libs/react.development.js"></script>
   <script src="/.libs/react-dom.development.js"></script>
   <script src="/.libs/babel-standalone.js"></script>
</head>
<body>
    <div id="app"></div>
    <script type="text/babel">
        // POINT ReactをHTMLにマウントする書き方
        const appEl = document.querySelector('#app');
        const root = ReactDOM.createRoot(appEl);
        root.render(<h1>こんにちは</h1>); <!-- 引数はJSX記法で書かれてる -->

        // POINT React18以前の書き方
        // ReactDOM.render(<h1>こんにちは</h1>, appEl)
    </script>
</body>
</html>
```

## 023_Reactコンポーネントって何？コンポーネントを定義してみよう
[toTop](#)

### コンポーネント概念
- 画面の構成要素をReactで定義したもの
- メリット：
  - 再利用性の向上(コードを使いまわせる)
  - 可読性の向上(コードが整理される)
  - 疎結合になる(バグを減らせる)
#### コンポーネント定義方法
- JSX構文でHTML要素を定義して関数の返り値にする

 １．React Component | ２．Component定義方法
 --|--
 ![image](./images/0231_ReactComponent.png) | ![image](./images/0232_defineComponent.png)

### ソース
- [end source](./extra_src/02_component/end/index.html)
  * POINT コンポーネントの先頭は大文字とする
    * 理由：`babel`がコンポーネントを認識する方法は、『先頭が大文字』を条件としているため
    * 関数コンポーネントで定義する（`function`でもアロー関数どちらでもよい）
  * POINT JSXが複数行の時は()で括る
    * 理由：`return`文の特性で、`return`のみだと`return;`と判定するので、`return ()`とする
    * `()`は何かをグループ化する指示
  * [`Go Live`のパス](http://127.0.0.1:5500/04_react_basic/extra_src/02_component/end/index.html)
```html
<!DOCTYPE html>
<html>

<head>
    <script src="/.libs/react.development.js"></script>
    <script src="/.libs/react-dom.development.js"></script>
    <script src="/.libs/babel-standalone.js"></script>
</head>

<body>
    <div id="app"></div>
    <script type="text/babel">
        const appEl = document.querySelector('#app');
        const root = ReactDOM.createRoot(appEl);

        // function Example() {
        //     return <h1>Hello Components</h1>;
        // }

        // POINT コンポーネントの先頭は大文字とする
        // POINT JSXが複数行の時は()で括る
        const Example = () => (
            <div>
                <h1>Hello Components</h1>
            </div>
        );

        const a = () => {
            return
            "戻り値";
        }

        console.log(a());

        root.render(<Example />);
    </script>
</body>

</html>
```

## 024_Reactのプロジェクトの作成方法（create−react−appの使い方）
[toTop](#)

### 作成方法
- テンプレートを使うコマンドを使用する
  * `create-react-app`(CRA)の場合、`npx create-react-app <app名>`を実行する
  * `vite`の場合、`npm create vite@latest <app名> -- --template react`
    * `npm create vite@latest`を実行すると対話形式でプロジェクトを作成できる
### 実行方法
* `create-react-app`(CRA)の場合、`npm run start`
  * 止めるときは、`[Ctrl+C]`を２回実行
* `vite`の場合、`npm run dev`
  * 止めるときは、`q + [Enter]`
#### 実行例
```sh
$ npm create vite@latest vite-project -- --template react
$ cd vite-project
$ pnpm i && pnpm run dev
  VITE v5.0.7  ready in 5863 ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
...
q + [Enter]
```

### ソース
- [end README.md](./extra_src/03_create_react_app/readme.md)

## 025_★重要★本コースで使用するプロジェクトの使い方
[toTop](#)
### 各セクションの準備方法
- `vite`でプロジェクトを作るので、[トップREADME](../README.md#教材ファイルをjsxファイルへコンバート)の方法で提供コンテンツをコンバートする


### 提供コンテンツのサンプルコード
- `vite`でプロジェクトを作ったので、講義動画と異なる方法で起動する
```sh
cd ./04_react_basic
# pnpm i
pnpm run dev
...
  VITE v5.0.4  ready in 7883 ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
- 起動後、[http://localhost:5173/](http://localhost:5173/) にアクセスする
- [package.json](./package.json)
```json
{
  "name": "04_react_basic",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react": "^4.2.0",
    "eslint": "^8.53.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "vite": "^5.0.0",
    "web-vitals": "^3.5.0"
  }
}
```

## 026_コンポーネントにスタイルを当ててみよう
[toTop](#)


## 027_コンポーネントの分割方法
[toTop](#)


## 028_【練習】コンポーネントの分割方法
[toTop](#)


## 029_不要なタグを出力しないFragmentの使い方
[toTop](#)


## 030_JSX内でJSコードを実行してみよう
[toTop](#)


## 031_【TIPS】式と文の違い
[toTop](#)


## 032_【練習】JSX内で式を使ってみよう
[toTop](#)


## 033_propsでコンポーネントに値を渡してみよう
[toTop](#)


## 034_propsに色々な値を渡してみよう
[toTop](#)


## 035_【練習＆解答】propsで値を渡してみよう
[toTop](#)


## 036_特別なプロパティ：props．children
[toTop](#)


## 037_propsの重要なルール
[toTop](#)


## 038_JSXの正体
[toTop](#)


## 039_React要素ツリーとコンポーネントツリー
[toTop](#)


## 040_セクションまとめ
[toTop](#)

