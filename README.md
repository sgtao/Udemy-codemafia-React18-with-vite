# Udemy-codemafia-React18-with-vite

## 概要
- Udemy『【2022年最新】React(v18)完全入門ガイド』を`vite`環境で整理する

### コース内容
- Udemy『【2022年最新】React(v18)完全入門ガイド｜Hooks、Next.js、Redux、TypeScript』の講義メモ
  * 講師：【CodeMafia】
  * 概要：Reactについて知るべき基礎知識を体系的・網羅的に学習しよう！
  * Refer Udemy：https://www.udemy.com/course/react-complete-guide/

| セクションの数 | レクチャーの数 | 動画総時間 | 
|-----|-----|-----|
| 21 |   240	| 24時間55分 |



### セクション構成
[toTop](#)

| セクション名 | レッスン数 | 動画時間 |
|-----|-----|------|
| [01_はじめに](./01_start/README.md) | 2 | 10分 |
| [02_コースの進め方](./02_settings/README.md) | 5 | 10分 |
| [03_【スキップ可】Reactで頻出のJavaScriptの記法](./03_js_basic/README.md) | 14 | 1時間27分 |
| [04_まずはReactに触れてみよう](./04_react_basic/README.md) | 19 | 2時間7分 |
| [05_イベントリスナと状態管理（State）](./05_state_and_event/README.md) | 17 | 1時間41分 |
| [06_制御構文とフォームの制御](./06_control_and_form/README.md) | 14 | 1時間33分 |
| [07_スタイリング](./07_styling_component/README.md) | 12 | 1時間8分 |
| [08_ReactでDOM操作を行う方法](./08_other_function/README.md) | 11 | 46分 |
| [09_【スキップ可】問題への対処法](./09_debugging/README.md) | 5 | 37分 |
| [10_【発展】関数型プログラミング](./10_functional_programming/README.md) | 11 | 1時間6分 |
| [11_【ReactHooks】様々な状態管理の方法](./11_hooks_p1/README.md) | 14 | 2時間 |
| [12_【ReactHooks】useEffectとカスタムフック](./12_hooks_p2/README.md) | 11 | 58分 |
| [13_【発展】ReduxとReduxToolkit](./13_redux/README.md) | 15 | 1時間35分 |
| [14_【スキップ可】クラスコンポーネント](./14_class_component/README.md) | 6 | 32分 |
| [15_【発展】パフォーマンスの最適化](./15_performance/README.md) | 12 | 1時間9分 |
| [16_RestAPIを使ったサーバーとの通信](./16_rest_api/README.md) | 11 | 1時間18分 |
| [17_Next.js（Part.1）基本的な使い方](./17_nextjs_p1/README.md) | 14 | 1時間24分 |
| [18_Next.js（Part.2）レンダリング](./18_nextjs_p2/README.md) | 17 | 2時間7分 |
| [19_テスト](./19_test/README.md) | 11 | 1時間21分 |
| [20_【付録】TypeScript](./20_typescript/README.md) | 16 | 1時間41分 |
| [21_さいごに](./21_end/README.md) | 1 | 1分 |


### 学習内容
[toTop](#)
- Reactの基礎・発展の知識を学習する
  - Reactで頻出するJavaScript記法
  - ReactとReact Hooks
  - Reactにおけるスタイリング方法
  - Reactと関数型プログラミングの関係
  - クラスコンポーネント
  - ReactでDOMを操作する方法
  - Reactでパフォーマンス最適化する方法
  - Reduxで状態をグローバルに管理する方法
- 実践：Reactで高速でインタラクティブなWebアプリを作成して公開
  - ReactでのRest APIを使ったサーバーとの通信方法
  - Next.js
  - SSR, SG, CSR, ISRの違い
  - Reactでのテスト方法
  - TypeScriptを使ったReact開発手法
  - Reactのデバッグの仕方
  - npmコマンドの使い方やパッケージ管理方法

### 環境構築方法
#### プロジェクトフォルダの作成
```sh
npm create vite@latest ${TARGET_DIRNAME} -- --template react
```

#### 教材ファイルをJSXファイルへコンバート
- 
```sh
export TARGET_DIRNAME="04_react_basic"
rm -rf ${TARGET_DIRNAME}
npm create vite@latest ${TARGET_DIRNAME} -- --template react
# sometime need to answer to inquiry proceed
#
cd ${TARGET_DIRNAME}/
rm -rf src
cp -r ../00_references/99_react-guide-material/${TARGET_DIRNAME}/src .
# cp -r ../00_references/11_Udemy_React18-complete-guide/04_react_basic/README.md .
mv src/index.js src/main.jsx
pnpm i
pnpm i web-vitals -D
pnpm run dev
find src -name "*.js" -print
# for filename in ` find src -name "*.js" -print ` ; do ls $filename; done
# modFilename=`echo $filename |  sed -e "s/.js/.jsx/" `
# echo $modFilename
for filename in ` find src -name "*.js" -print ` ; do ls $filename;  modFilename=`echo $filename |  sed -e "s/.js/.jsx/" `; mv $filename $modFilename ; done
for filename in ` find src -name "*.js" -print ` ; do ls $filename; done
# pnpm run dev
# cd src/080_expr_in_jsx/
# for filename in ` find src -name "*.js" -print ` ; do ls $filename;  modFilename=`echo $filename |  sed -e "s/.js/.jsx/" `; mv $filename $modFilename ; done
# cd ../130_whats_jsx/
# for filename in ` find . -name "*.js" -print ` ; do ls $filename;  modFilename=`echo $filename |  sed -e "s/.js/.jsx/" `; mv $filename $modFilename ; done
# cd ../..
# pnpm run dev
#
# convert to UTF file
# for filename in `find src -name "*.jsx"` ; do ls $filename; nkf_to_utffile $filename; done
# for filename in `find src -name "*.css"` ; do ls $filename; nkf_to_utffile $filename; done
```

#### Warningメッセージについて
- viteを利用した際にwarningが発生する。
  * `/* @vite-ignore */`により解消されるが、`npm run build`ではエラーとなる。
  * ビルドはしないため、とりあえず利用する
```
${current_directory}/src/App.jsx
21 |  const STORAGE_KEY = "rcg-current-lec-index";
22 |  const DynamicLoader = ({ component }) => {
23 |    const LazyComponent = lazy(() => import(/* @vite-ignore */ `${component}`));
   |                                            ^^^^^^^^^^^^^^^^^↑を追記する
24 |    return /* @__PURE__ */ jsxDEV(BaseErrorBoundary, { children: /* @__PURE__ */ jsxDEV(Suspense, { fallback: /* @__PURE__ */ jsxDEV("div", { children: "Loading..." }, void 0, false, {
25 |      fileName: "src/App.jsx",
The above dynamic import cannot be analyzed by Vite.
See https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations for supported dynamic import formats. If this is intended to be left as-is, you can use the /* @vite-ignore */ comment inside the import() call to suppress this warning.

  Plugin: vite:import-analysis
  File: src/App.jsx

```


## 参考）オリジナルコンテンツの学習準備
[toTop](#)
- WSL2, Ubuntuを利用して受講
  * Node.js, React, Next.jsを利用できるようにする

### Node.jsのインストール

- apt update
```sh
sudo apt update && sudo apt upgrade -y
```

- nvmのインストール
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
exec -l $SHELL
```

― Node.jsのLTSインストール
```sh
nvm install --lts
```

### React, Next.jsのインストール
```sh
npm i pnpm -g
npm i create-react-app -g
npm i create-next-app -g
```

### Viteのプロジェクト作成方法
```sh
# for JavaScript project
npm create vite@latest react-template -- --template react
# for TypeScript project
npm create vite@latest react-template -- --template react-ts
```

#### 既存のプロジェクトにインストールする場合
```sh
cd existed-project;
npm i -E -D vite @vitejs/plugin-react;
```