[to TopPage](../README.md)

# 17_Next.js（Part.1）基本的な使い方

## 講座一覧
- [180_セクション紹介](#180_セクション紹介)
- [181_Next.jsとは？なぜNext.jsを使うのか？](#181_nextjsとはなぜnextjsを使うのか)
- [182_Next.jsのインストール時にエラーが出た場合](#182_nextjsのインストール時にエラーが出た場合)
- [183_Next.jsをインストールしてみよう](#183_nextjsをインストールしてみよう)
- [184_書きながら学びたい人はこちらを受講ください](#184_書きながら学びたい人はこちらを受講ください)
- [185_ルーティングとは？基本的な書き方について学ぼう](#185_ルーティングとは基本的な書き方について学ぼう)
- [186_動的なルーティングの書き方について学ぼう](#186_動的なルーティングの書き方について学ぼう)
- [187_指定されたパスの値をJSで取得してみよう](#187_指定されたパスの値をjsで取得してみよう)
- [188_useRouterを使って画面遷移を行おう](#188_userouterを使って画面遷移を行おう)
- [189_Linkを使って画面遷移を行おう](#189_linkを使って画面遷移を行おう)
- [190_シングルコンポーネントで複数画面を作成する方法](#190_シングルコンポーネントで複数画面を作成する方法)
- [191. 次のレクチャーを受講するための準備](#191_次のレクチャーを受講するための準備)
- [192_コンポーネント間で状態を共有する方法について学ぼう](#192_コンポーネント間で状態を共有する方法について学ぼう)
- [193_【_app.js】サイト全体に設定を加える方法について学ぼう](#193__appjsサイト全体に設定を加える方法について学ぼう)
- [194_head内にタグを挿入する方法について学ぼう](#194_head内にタグを挿入する方法について学ぼう)
- [195_セクションまとめ](#195_セクションまとめ)


## 180_セクション紹介
[toTop](#)

- `Next.js`は、Reactlibraryをより高機能なアプリ開発に利用できるようにしたフレームワーク

## 181_Next.jsとは？なぜNext.jsを使うのか？
[toTop](#)

- Versel社が開発する高速なReactアプリを開発するフレームワーク
  * refer Site : https://nextjs.org/
- 本講座の提供範囲
  * Next.js の特徴
  * 環境構築方法
  * ルーティング、Pre-rendering、API Routesについて
### React との違い：
  * React は、UI構築のための機能を提供
  * Next.js は、React 開発のための機能を提供するフレームワーク
### Next.js のメリット：
  * ゼロコンフィグで高度な機能を使用可能
  * 手動で複雑な設定は不要ー＞効率的に開発を進められる
### Next.jsの主な機能
- 複数のレンダリング方法（SSR, SG、ISG）
- ファイルベースルーティング（ダイナミックルート）
- API の作成（API Routes）
- デベロッパーにやさしい開発環境（ゼロコンフィグ、[ファイルの規約](https://nextjs.org/docs/app/building-your-application/routing#file-conventions)）

## 182_Next.jsのインストール時にエラーが出た場合
[toTop](#)

- 次のレクチャーでは\react-guide-material\17_nextjs_p1\endでnpm installを行いパッケージをインストールしますが、その際eslintでエラーが出る可能性があります。
  * エラーの発生場所：_app.js
  * エラーの内容は：`Parsing error: Cannot find module 'next/babel'`
  * 上記のエラーが発生した場合には[`.eslintrc.json`](./end/.eslintrc.json) の中身を以下のようにしてください。
```json
// .eslintrc.json
{
  "extends": ["next", "next/core-web-vitals", "prettier", "next/babel"]
}
```
- エラー解消しない場合は、`.eslintrc.json`を以下のようにして、追加パッケージを入れると、Linterが走り始めた
```json
{
  "extends": ["next", "next/core-web-vitals", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

- `.eslintrc.json`編集後、`prettier`パッケージをインストールする
```sh
pnpm i prettier eslint-config-prettier eslint-plugin-prettier -D
# pnpm i @babel/core @babel/preset-env -D
pnpm run lint
```
- エラーはたくさん出る。修正しないと、`pnpm run build`が通らないようだ

## 183_Next.jsをインストールしてみよう
[toTop](#)

### 講義環境の構築（学習の場合）
- 講義環境はすでに作られてるので、`end`のフォルダ配下で、下の手順を実施する
- 01.パッケージインストール
```sh
# cd 17_nextjs_p1/end
pnpm i
```

- 02.環境の起動
```sh
pnpm dev
# 4040番のポートが起動される
```

### 自分で環境構築する場合
- `start`フォルダに環境を準備しているので、スキップ可能です

#### 構築ツールのインストール
```sh
npm i create-next-app -g
```

#### 環境構築
```sh
# npx create-next-app@latest <app 名>
create-next-app <app名>
# create-next-app <app名> --typescript # TypeScript利用したい場合
```

### 環境構築後のファイル構成

- 構築後の環境：
```sh
start # アプリ名
  +- public/   # 画像が入るディレクトリ
  +- pages/    # ページ毎のコンテンツディレクトリ。秘匿ファイルは格納しない
    +- _app.js # ページ遷移時に必ず呼ばれる処理を記述する
  +- styles/   # スタイル情報のディレクトリ
  +- package.json   # 設定ファイル
  +- .eslintrc.json # 設定ファイル
  +- next.config.js # 設定ファイル
```

- `pages`や`styles`配置個所は変更可能なので、フォルダを`src`ディレクトリに移動したりできる
```sh
start # アプリ名
  +- public/   # 画像が入るディレクトリ
  +- src/      # （変更）編集用ディレクトリ
    +- pages/    # （移動）ページ毎のコンテンツディレクトリ
    +- styles/   # （移動）スタイル情報のディレクトリ
    +- components/ # （追加）コンポーネントを格納するディレクトリ
  +- next.config.js # 設定ファイル
```

### コンフィグファイル
- `next.config.js`ファイル：ベースパスの設定、サーバ側の設定を記述
  - 初期状態は下のようになっており、基本は変更なしで利用できる
  - [start next.config.js](./end/next.config.js)
```json
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
```

#### 講義範囲のコンフィグファイル：
- [end `next.config.js`](./end/next.config.js)
```js
/** @type {import('next').NextConfig} */

// Next.jsに関する設定を定義
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/personal',
        destination: '/08_multipage?step=1'
      },
      {
        source: '/confirm',
        destination: '/08_multipage?step=2'
      }
    ]
  }
};

export default nextConfig;
```


## 184_書きながら学びたい人はこちらを受講ください
[toTop](#)

- `create-next-app`でプロジェクト作成した場合（もしくは`start`フォルダを使いたい場合）
  * ２つ設定を追加する
  * `styles`フォルダ配下の`global.css`を`end`フォルダからコピーしてくる
    * これで同じスタイルが当たる
  * `src`配下の、`components`フォルダは`end`フォルダからコピーする


## 185_ルーティングとは？基本的な書き方について学ぼう
[toTop](#)

- ルーティングとは、URL でページしたときに使われるコンポーネントを指定する紐づけ機能
  - `pages`フォルダ配下に`index.js`を配置することで、自動的にページを紐づけてくれる
  - `src/page/index.js`の場合、URL=`http://localhost:4000/`がパスとなる

### 講義内のコンポーネント
- ページコンポーネント：`src/pages/index.js`
  - アクセスURL ：`http://localhost:4000/`
```jsx
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href={{ pathname: "/07_router", query: { key: "value" } }}>
        <a>/07_router</a>
      </Link>
    </>
  );
}
```

- ページコンポーネント：[src/pages/07_router/index.js](./end/src/pages/07_router/index.js)
  - アクセスURL ：`http://localhost:4000/07_router/`
```jsx
// POINT Next.jsにおけるルーティングについて学ぼう
export default function Blog() {
  return <h1>Blog Page</h1>
}
```

- フォルダ配下に、（`index.js`以外の）ファイルを置いた場合、パス名（末尾）と一致するファイルがあると、ページコンテンツと利用される
  * ページコンポーネント：[src/pages/07_router/blog/first.js](./end/src/pages/07_router/blog/first.js)
  - アクセスURL ：`http://localhost:4000/07_router/blog/first`
```jsx
// POINT ルーティングは/pages内のディレクトリ構成に一致する
export default function First() {
    return <h1>First</h1>
}
```



## 186_動的なルーティングの書き方について学ぼう
[toTop](#)

- 動的なルーティング（ダイナミックルーティング）の方法を紹介
- ダイナミックルーティングとは、URLのパス名に応じて動的にコンテンツを準備する方法
  * ページそのもののコンポーネントは作らず、下のようにブログ記事などを提供する場合に利用
```js
// http://localhost:4000/07_router/blog/1
// http://localhost:4000/07_router/blog/2
// http://localhost:4000/07_router/blog/3
// http://localhost:4000/07_router/blog/4
```
  * 「ファイル名で実現する」方法と「フォルダ名で実現する」方法がある

### 「ファイル名で実現する」
- `pages`配下のファイル名を`[number].js`のように、`[...]`で囲む
  * `number`部分を補完して、URL に応じたコンテンツが提供される
  * ページコンポーネント：[src/pages/07_router/blog/[number].js](./end/src/pages/07_router/blog/[number].js)
  - アクセスURL ：`http://localhost:4000/07_router/blog/111`
```jsx
export default function Number() {
    return (
        <>
            <h1>[number].js</h1>
        </>
    );
}
```

### 「フォルダ名で実現する」
- `pages`配下のフォルダ名で、`[name]`のように、`[...]`で囲む
  * `name`部分を補完して、URL に応じたコンテンツが提供される
  * ページコンポーネント：[src/pages/07_router/[name]/setting.js](./end/src/pages/07_router/[name]/setting.js)
  - アクセスURL ：`http://localhost:4000/07_router/hello/setting`
```jsx
export default function Setting() {
    return (
        <>
            <h1>[name]/setting.js</h1>
        </>
    );
}
```

### 「ファイル名で実現する」と「フォルダ名で実現する」が競合した場合
- もし、URL が「ファイル名で実現する」と「フォルダ名で実現する」のどちらでも解釈できる場合、
  * 「ファイル名で実現する」のページが優先される
    * URL をパスの上位から解析して、存在しているフォルダ・ファイルが紐づけられているため
  * アクセスURL ：`http://localhost:4000/07_router/blog/setting`
    * ⇒　[src/pages/07_router/blog/[number].js](./end/src/pages/07_router/blog/[number].js)のページにアクセスされる


## 187_指定されたパスの値をJSで取得してみよう
[toTop](#)

- コンポーネントが、URL 情報を把握するには２つの方法がある：
  * `getServerSideProps`を利用する方法
  * `useRouter`を利用する方法

### `getServerSideProps`を利用する方法

* Next.jsのSSR機能を使って、サーバサイドでURL 情報を取得して、コンテンツに提供する方法
* ページコンポーネント：[src/pages/07_router/[name]/setting.js](./end/src/pages/07_router/[name]/setting.js)
  - アクセスURL ：`http://localhost:4000/07_router/hello/setting`
  - アクセスURL ：`http://localhost:4000/07_router/aaa/setting`
  - アクセスURL ：`http://localhost:4000/07_router/123/setting`
```jsx
export default function Setting({ query }) {
    console.log(query);
    // {name: 'hello'}

    return (
        <>
            <h1>props から取得:{query.name}</h1>
        </>
    )
}

// export async function getServerSideProps({ query }) {
export async function getServerSideProps(context) {
    console.log(context.query);
    // { name: 'hello' }
    const query = context.query; // ただし、これは`undefined`になってしまうようだ
    console.log(query);
    // const { query } = context.query; // 分割代入で、`query`プロパティを取得する
    // 上が`pnpm run dev`実行してるコンソールに表示される

    return {
        props: { query }
    }
}
```

### `useRouter`を利用する方法
- `next/router`ライブラリの`useRouter()`のフックよりパスの情報を取得できる
  * `router`オブジェクト から情報を取得する
* ページコンポーネント：[src/pages/07_router/[name]/setting.js](./end/src/pages/07_router/[name]/setting.js)
```jsx
import { useRouter } from "next/router";

export default function Setting({ query }) {
    const router = useRouter();
    console.log(router);
    // {
    //     "pathname": "/07_router/[name]/setting",
    //     "route": "/07_router/[name]/setting",
    //     "query": {
    //         "name": "hello" // ココがパス名になる
    //     },
    //     "asPath": "/07_router/hello/setting",
    //     "components": {
    //         "/07_router/[name]/setting": {
    //             "initial": true,
    //             "props": {
    //                 "pageProps": {
    //                     "query": {
    //                         "name": "hello"
    //                     }
    //                 },
    //                 "__N_SSP": true
    //             },
    //             "__N_SSP": true,
    //             "__N_RSC": false
    //         },
    //         "/_app": {
    //             "styleSheets": []
    //         }
    //     },
    //     "isFallback": false,
    //     "basePath": "",
    //     "isReady": true,
    //     "isPreview": false,
    //     "isLocaleDomain": false,
    //     "events": {}
    // }


    // routerの queryプロパティの値を表示する
    return (
        <>
            <h1>routerから取得:{router.query.name}</h1>
        </>
    )
}
```

## 188_useRouterを使って画面遷移を行おう
[toTop](#)

- `useRouter`は、`router`オブジェクトにアクセスするためのフック
  * いくつもの情報やメソッドがある
  * 参考）[next/router](https://nextjs-ja-translation-docs.vercel.app/docs/api-reference/next/router)サイト

### URIのパス・クエリパラメータの取得
  * URI のパス名やクエリパラメータを取得することができる
* ページコンポーネント：[src/pages/07_router/[name]/setting.js](./end/src/pages/07_router/[name]/setting.js)
```jsx
import { useRouter } from "next/router";

export default function Setting({ query }) {
    const router = useRouter();
    console.log(router.query);
    // 右URLへのアクセス時: http://localhost:4000/07_router/hello/setting
    // { name: 'hello' }
    // 右URLへのアクセス時: http://localhost:4000/07_router/aaa/setting?key1=value1&&key2=value2
    // { key: [ 'value1', 'value2' ], name: 'aaa' }

    // routerの queryプロパティの値を表示する
    return (
        <>
            <h1>routerから取得:{router.query.name}</h1>
        </>
    )
}
```


### URIの移動
- `router`のメソッドを使って遷移する
  * `push`・`replace`・`reload`などにより遷移動作が変わる
```jsx
export default function Setting({ query }) {
    console.log(query);
    // {name: 'hello'}

    const router = useRouter();
    console.log(router.query);

    const clickHandler = () => {
        // `router.push()`メソッド：ページ遷移する
        router.push('/'); // トップページに遷移する

        // router.pushの第２引数：トップページに移動するが、URLは`dummy-url`になる
        // router.push('/', '/dummy-url');

        // `router.replace()` メソッド：
        // - `push`と同様に遷移するが、遷移したときに現ページのブラウザの履歴に残さない
        // - ほかに、`router.back()`というメソッドで履歴をさかのぼる機能もある
        // router.replace('/', '/dummy-url')

        // router.reload()メソッド：同じページをリロードする（ブラウザの更新ボタン）
        // router.reload()
    }
    return (
        <>
            <h1>routerから取得:{router.query.name}</h1>
            <button onClick={clickHandler}>アクションによる画面遷移</button>
        </>
    )
}
```

### ソースコード
- 本セクションまでのソースコード
  - ただし、動的ルーティングがあるので、コンポーネント間のつながりはない
- ページコンポーネント：[src/pages/index.js](./end/src/pages/index.js)
```jsx
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href={{ pathname: "/07_router", query: { key: "value" } }}>
        <a>/07_router</a>
      </Link>
      <Link href="/07_router/hello/setting">
      <a>/07_router</a>
      </Link>
    </>
  );
}
```

- 共通コンポーネント：[src/pages/_app.js](./end/src/pages/_app.js)
  * 後続のセクションで追加されるコンポーネントだが、すでに見えている
  - `src/page/_app.js`があると、どのページでも読みだされる共通コンポーネントとして使われる
```jsx
//　POINT _app.jsにはページ全体で共通化したい処理を記述
import "../styles/globals.css";
import { AppProvider } from "../context/AppContext";
import Layout1 from "../components/layout/layout1";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => <Layout1>{page}</Layout1>)
  return (
    <AppProvider>
      {getLayout(<Component {...pageProps} />)}
    </AppProvider>
  );
}

export default MyApp;
```

- `blog`ページコンポーネント：[src/pages/blog/first.js](./end/src/pages/07_router/blog/first.js)
```jsx
// POINT ルーティングは/pages内のディレクトリ構成に一致する
export default function First() {
    return <h1>First</h1>
}
```

- `blog`ページコンポーネント：[src/pages/blog/[number].js](./end/src/pages/07_router/blog/[number].js)
```jsx
// POINT [SSR]ダイナミックルーティング
// http://localhost:4000/07_router/blog/1
// http://localhost:4000/07_router/blog/2
// http://localhost:4000/07_router/blog/3
// http://localhost:4000/07_router/blog/4

export default function Number() {
    return (
        <>
            <h1>[number].js</h1>
        </>
    );
}
```

- `[name]`ページコンポーネント：[src/pages/[name]/setting.js](./end/src/pages/07_router/[name]/setting.js)
```jsx
import { useRouter } from "next/router";

// http://localhost:4000/07_router/hello/setting

// router.pushのドキュメント
// https://nextjs-ja-translation-docs.vercel.app/docs/api-reference/next/router#routerpush

export default function Setting({ query }) {
    console.log(query);
    // {name: 'hello'}

    const router = useRouter();
    console.log(router.query);

    const clickHandler = () => {
        // `router.push()`メソッド：ページ遷移する
        router.push('/'); // トップページに遷移する

        // router.pushの第２引数：トップページに移動するが、URLは`dummy-url`になる
        // router.push('/', '/dummy-url');

        // `router.replace()` メソッド：
        // - `push`と同様に遷移するが、遷移したときに現ページのブラウザの履歴に残さない
        // - ほかに、`router.back()`というメソッドで履歴をさかのぼる機能もある
        // router.replace('/', '/dummy-url')

        // router.reload()メソッド：同じページをリロードする（ブラウザの更新ボタン）
        // router.reload()
    }
    return (
        <>
            <h1>props から取得:{query.name}</h1>
            <h1>routerから取得:{router.query.name}</h1>
            <button onClick={clickHandler}>アクションによる画面遷移</button>
        </>
    )
}

// export async function getServerSideProps(context) {
export async function getServerSideProps({ query }) {
    // console.log(context.query);
    // { name: 'hello' }
    // const query = context.query; // ただし、これは`undefined`になってしまうようだ
    // console.log(query);
    // { name: 'hello' }
    // 上が`pnpm run dev`実行してるコンソールに表示される

    return {
        props: { query }
    }
}
```

## 189_Linkを使って画面遷移を行おう
[toTop](#)


## 190_シングルコンポーネントで複数画面を作成する方法
[toTop](#)


## 191_次のレクチャーを受講するための準備
[toTop](#)


## 192_コンポーネント間で状態を共有する方法について学ぼう
[toTop](#)


## 193_【_app.js】サイト全体に設定を加える方法について学ぼう
[toTop](#)


## 194_head内にタグを挿入する方法について学ぼう
[toTop](#)


## 195_セクションまとめ
[toTop](#)


