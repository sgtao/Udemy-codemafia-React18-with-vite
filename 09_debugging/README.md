[to TopPage](../README.md)

# 09_【スキップ可】問題への対処法

## 講座一覧
- [095_セクション紹介](#095_セクション紹介)
- [096_エラーの解消方法](#096_エラーの解消方法)
- [097_デバッガーを使ってみよう](#097_デバッガーを使ってみよう)
- [098_React−Developer−Toolsの使い方](#098_React−Developer−Toolsの使い方)
- [099_Google検索の仕方](#099_Google検索の仕方)


## 095_セクション紹介
[toTop](#)

- 開発中、コーディングでエラーしたときや期待動作とならないときの対処方法を紹介する

## 096_エラーの解消方法
[toTop](#)

### コンパイルエラーの発生時
- Google検索
- エラーメッセージを訳してみる

### コンパイルは通るがブラウザでエラーするとき

- ブラウザ上でエラー指摘箇所をたどる
- スタックトレースで開発しているコンポーネントが出ていたら、自分のモジュールが表示

## 097_デバッガーを使ってみよう
[toTop](#)

- `debugger`を置くと、ブレークポイントなって実行を一時停止できる
  * `step over`アイコンで進む（`step over next Function(F10)`で進めていく）
  * 停止したときに`Esc`キーでコンソールが表示される

### 初期コード
```jsx
import { useState } from "react"

// POINT debuggerの使い方
const Child = (countNum) => {
  // debugger // デバックするときはコメントアウトを外す
  return <p>現在のカウント数: {countNum.val}</p>
}

const Example = () => {
  const [count, setCount] = useState({ val: 0 });

  const countUp = () => {
    // debugger
    setCount((prevstate) => {
      const newState = { val: prevstate.val + 1 }
      return newState;
    });
  };

  return (
    <>
      <Child count={count} />
      <button onClick={countUp}>+</button>
    </>
  );
};

export default Example;
```

### デバッグ後のコード
```jsx
import { useState } from "react"

// POINT debuggerの使い方
const Child = ({count}) => {
  // debugger // デバックするときはコメントアウトを外す
  return <p>現在のカウント数: {count.val}</p>
}

const Example = () => {
  const [count, setCount] = useState({ val: 0 });

  const countUp = () => {
    // debugger
    setCount((prevstate) => {
      const newState = { val: prevstate.val + 1 }
      return newState;
    });
  };

  return (
    <>
      <Child count={count} />
      <button onClick={countUp}>+</button>
    </>
  );
};

export default Example;
```



## 098_React−Developer−Toolsの使い方
[toTop](#)

- Chrome や firefox の拡張機能の使い方の紹介
  * [Chrome 拡張機能](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ja)
  * [Firefox 拡張機能](https://addons.mozilla.org/ja/firefox/addon/react-devtools/)

## 099_Google検索の仕方
[toTop](#)

- 検索キーワードに付け足したら役立つ検索演算子
  * `after:`： `after:2021`とすると2021年以降のサイトから検索機ワードを表示
  * `site:` ： `site:qiita.com`は Qiitaサイトで絞り込む
  * `"検索キーワード や メッセージ"`：厳格に検索する
    * `"<キーワード> * <キーワード>"`とすると一部をワイルドカードで扱える

