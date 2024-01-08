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


## 186_動的なルーティングの書き方について学ぼう
[toTop](#)


## 187_指定されたパスの値をJSで取得してみよう
[toTop](#)


## 188_useRouterを使って画面遷移を行おう
[toTop](#)


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


