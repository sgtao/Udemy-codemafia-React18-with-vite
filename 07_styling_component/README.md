[to TopPage](../README.md)

# 07_スタイリング

## 講座一覧
- [072_セクション紹介](#072_セクション紹介)
- [073_インラインスタイルの使い方！](#073_インラインスタイルの使い方)
- [074_インラインスタイルの注意点！](#074_インラインスタイルの注意点)
- [075_外部CSSのimportを使ったスタイリング](#075_外部cssのimportを使ったスタイリング)
- [076_CSS−Modulesを使ったスタイリング](#076_css−modulesを使ったスタイリング)
- [077_【styled−components】CSS−in−JSを使ったスタイリング](#077_styled−componentscss−in−jsを使ったスタイリング)
- [078_【styled−components】【発展】CSS−in−JSを使ったスタイリング](#078_styled−components発展css−in−jsを使ったスタイリング)
- [079_【練習&解答】styled−components](#079_練習解答styled−components)
- [080_【まとめ】Reactでのスタイルの適用方法](#080_まとめreactでのスタイルの適用方法)
- [081_【付録】ReactでのCSSフレームワーク【Part．1】](#081_付録reactでのcssフレームワークpart1)
- [082_【付録】ChakraUIを使ってみよう【Part．2】](#082_付録chakrauiを使ってみようpart2)
- [083_【付録】ChakraUIを使ってみよう【Part．3】](#083_付録chakrauiを使ってみようpart3)


## 072_セクション紹介
[toTop](#)

- スタイリング方法の種類：
  * CSSファイルの読み込み
  * インラインスタイル
  * CSS Modules
  * CSS in JavaScript（`CSS−in−JS`）


## 073_インラインスタイルの使い方！
[toTop](#)

- サンプルコード：[010_inline_style](./src/010_inline_style/end/)
```jsx
/* POINT
・再利用性が低い
・疑似要素やメディアクエリが使用できない
・レンダリングの度に計算されるのでパフォーマンスが劣る
・動的で頻繁に計算されるスタイルの適用
 */

import { useState } from "react";

const Example = () => {
  const [isSelected, setIsSelected] = useState(false);

  const clickHandler = () => setIsSelected(prev => !prev);

  /* POINT インラインスタイルのメリットとデメリット
  メリット
    直感的に記述することができる。
  デメリット
    再レンダリングの度に値が計算されるのでパフォーマンス的に優れていない
    要素に直接記述しているので詳細度が一番高くなり、cssのスタイルが何も効かない
    疑似セレクタやメディアクエリにも対応していないため、実装しようとするとわかりづらいコードになってしまう
  */

  /* POINT style属性に適応させるスタイルをオブジェクトで記述します */
  const style = {
    margin: "auto",
    "border-radius": "9999px", // 丸みを付ける　"border-radius": "50%"と同等
    border: "none",
    display: "block",

    /* POINT 単位を書かない場合
    単位を書かずに文字列ではなく数字を与えてあげると、reactが自動で解釈し値にpxを付けてくれます。 */
    width: 120,
    height: 60,

    /* styleモジュールではケバブケースで記述する */
    fontWeight: "bold",
    cursor: "pointer",
    /* POINT 三項演算子を使用して isSelected が true の場合は 'pink' false の場合は空文字( '' ) を与えています。
    valueに空文字を与えた場合プロパティは適応されません。 */
    backgroundColor: isSelected ? "pink" : "",
    /* POINT 直接記述することによって可読性が大きく低下するので、可読性が向上する方法を考えて実装してみよう */
  };


g  return (
    <>
      <button style={style} onClick={clickHandler}>
        ボタン
      </button>
      <div style={{ textAlign: "center" }}>{isSelected && "クリックされました。"}</div>
    </>
  );
};

export default Example;
```

## 074_インラインスタイルの注意点！
[toTop](#)

### インラインスタイルのメリットとデメリット
- メリット
  * 直感的に記述することができる。
- デメリット
  * インラインスタイルのstyleを使うなら、`CSS-in-JS`の方が利用しやすい
  * メディアクエリも使えない
  * 再レンダリングの度に値が計算されるのでパフォーマンス的に優れていない
  * 要素に直接記述しているので詳細度が一番高くなり、cssのスタイルが何も効かない
  * 疑似セレクタやメディアクエリにも対応していないため、実装しようとするとわかりづらいコードになってしまう

## 075_外部CSSのimportを使ったスタイリング
[toTop](#)

- 詠み込んだCSSファイルはグローバルスコープで適用されるため、全体スタイルある場合は採用すると直ぐに使える
- サンプルコード：[020_import_css](./src/020_import_css/end/)
- コンポーネント毎にCSSファイルを準備する
### サンプルコード
#### Reactコンポーネント
```jsx
import { useState } from "react";

import SubButton from "./components/SubButton";
import "./Example.css"; // CSSファイルの読み込み

const Example = () => {
  const [isSelected, setIsSelected] = useState(false);

  const clickHandler = () => setIsSelected((prev) => !prev);

  return (
    <>
      {/* POINT 動的なスタイルの適用 */}
      {/* POINT クラスの付け外しに論理積 (&&) は使用してはいけません。
      例） className={`btn ${isSelected && 'selected'}`}

      isSelected が false の場合、 className='btn false' になってしまいます。 */}
      <button
        {/* クラス名を変更することでスタイルを変える */}
        className={`btn ${isSelected ? "selected" : ""}`}
        onClick={clickHandler}
      >
        ボタン
      </button>
      <SubButton />
      <div style={{ textAlign: "center" }}>
        {isSelected && "クリックされました。"}
      </div>
    </>
  );
};

export default Example;
```

#### CSSファイル
```css
.btn {
    margin: auto;
    border-radius: 9999px;
    border: none;
    display: block;
    width: 120px;
    height: 60px;
    font-weight: bold;
    cursor: pointer;
}

/* selectされたときの追加スタイル */
.selected {
    background-color: pink;
}
```

## 076_CSS−Modulesを使ったスタイリング
[toTop](#)

- サンプルコード：[030_css_module](./src/030_css_module/end/)
- 将来、非推奨になる可能性があるため参考に紹介
  * 代わりに`CSS-in-JS`などの利用が推奨されている
- CSSファイルをスタイルモジュールとして読み込む

### Reactコンポーネント
```jsx
/* POINT css moduleのメリットとデメリット
  メリット
    class名を気にすることなくcssを記述することができる。
    cssと変わらないので学習コストがない
    標準の機能なので、導入コストがない
  デメリット
    将来日推奨になる可能性がある。
    https://github.com/webpack-contrib/css-loader/issues/1050#:~:text=In%20the%20near%20future%20we%20want%20to%20deprecate%20CSS%20modules
  */
 
import { useState } from "react";

import SubButton from "./components/SubButton";

// CSSファイルをモジュールとして詠み込める
import styles from "./Example.module.css";

// console.log(styles);

const Example = () => {
  const [isSelected, setIsSelected] = useState(false);

  const clickHandler = () => setIsSelected((prev) => !prev);

  return (
    <>
      {/* 要素の`className`にstylesのプロパティを利用できる */}
      <button className={`${styles.btn} ${isSelected ? styles.selected : ""}`} onClick={clickHandler}>
        ボタン
      </button>
      <SubButton />
      <div style={{ textAlign: "center" }}>
        {isSelected && "クリックされました。"}
      </div>
    </>
  );
};

export default Example;
```

### CSSモジュール
```
.btn {
    margin: auto;
    border-radius: 9999px;
    border: none;
    display: block;
    width: 120px;
    height: 60px;
    font-weight: bold;
    cursor: pointer;
}

.selected {
    background-color: pink;
}
```


## 077_【styled−components】CSS−in−JSを使ったスタイリング
[toTop](#)

- `CSS-in-JS`は、JavaScript内にCSSを記述するスタイリングの総称
  * ライブラリを利用（例：`styled-components`や`Emotion`）
- サンプルコード：[040_css_in_js](./src/040_css_in_js/end/)

### ライブラリインストール
```sh
npm i styled-components -S
```

### 実装内容
- スタイルはテンプレートリテラルで記述して、内容はCSSの書き方で記述できる
  * `styled-components`では、HTML要素をオブジェクトとして読出し、コンポーネントを定義する
  ```jsx
  const StyledButton = styled.button` // button要素をスタイリングする
    margin-inline: auto;
    ...
  `;
  ```
  * スタイルの中で`${...}`で囲むとJavaScriptの式を実行できる
  * コンポーネント単位でスタイルを付けることができる（サンプルの`span`タグのスタイリングなど）
  * スタイルをオブジェクト形式で記述することもできる
  ```js
  styled.button({
    color: 'red'
  });
  ```



```jsx
/* POINT css-in-js（styled-components） */

import { useState } from "react";
import styled from "styled-components";

// POINT 拡張機能 styled-components.vscode-styled-components

/* POINT 生成する要素を指定し、スタイルをテンプレートリテラルで記述します */
// React要素扱いなので変数名は大文字で記述！
const StyledButton = styled.button`
  margin-inline: auto;
  border-radius: 9999px;
  border: none;
  display: block;
  width: 120px;
  height: 60px;
  margin: 10px auto;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  line-height: 60px;
  /* POINT valueを関数にすることで、引数にpropsを受け取ることができる。
  { isSelected } の部分を変更することで受け取る名前を変更することができる。
   */
  background-color: ${({ isSelected }) => (isSelected ? "pink" : "darkcyan")};
  transition: all 0.3s ease-out;

  /* POINT 疑似クラスの追加 */
  :hover,
  :active {
    opacity: 0.7;
    transform: scale(1.1);
  }
  span {
    color: purple;
  }
  /* POINT メディアクエリ */
  @media (max-width: 600px) {
    border-radius: 0;
  }

  :global {
    background-color: black;
  }
`;

// POINT スタイルの継承。styled()でラップする
const StyledSubButton = styled(StyledButton)`
  background-color: ${({ isSelectedSub }) =>
    isSelectedSub ? "crimson" : "coral"};
`;

const StyledOliveButton = styled(StyledButton)`
  background-color: olive;
`;

const Example = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [isSelectedSub, setIsSelectedSub] = useState(false);

  const onClickHandler = () => setIsSelected(!isSelected);
  const onClickSubHandler = () => setIsSelectedSub(!isSelectedSub);

  /* POINT css-in-jsのメリットとデメリット
  メリット
    スタイルをコンポーネントで定義するので、外部のcssに依存することなくコンポーネント単体で動作する
    JavaScriptで記述するため、JSの文法が使用出来たり、propsとして値を渡すこともできる
    ユニークなクラス名が自動生成され他のコンポーネントに影響を与えないことが保証される
    cssの設計が必要なくなる
    コンポーネントで完結しているため、他のプロジェクトで再利用がしやすい
  デメリット
    自動生成されるユニークなクラス名が読めない
    cssに比べパフォーマンスに劣る
    ※ 些細な差なのでデメリットというほどでも無い
    ※ どうしても気になる方は、Nextjsを使用することでパフォーマンスの面は気にしなくてよくなります。
  */

  return (
    // 属性にある isSelected は 上記で定義されています。
    // background-color: ${({ isSelected }) => ~~~ };
    <>
      <StyledButton isSelected={isSelected} onClick={onClickHandler}>
        ボタン
      </StyledButton>
      <StyledSubButton
        isSelectedSub={isSelectedSub}
        onClick={onClickSubHandler}
      >
        サブボタン
      </StyledSubButton>
      <StyledOliveButton><span>オリーブ</span></StyledOliveButton>
    </>
  );
};

export default Example;
```


## 078_【styled−components】【発展】CSS−in−JSを使ったスタイリング
[toTop](#)

- スタイルを定義したオブジェクトを継承して、追加スタイル・変更を行える
- 例：事前に定義した`StyledButton`に追加スタイルを充てる場合
```jsx
// POINT スタイルの継承。styled()でラップする
const StyledSubButton = styled(StyledButton)`
  background-color: ${({ isSelectedSub }) =>
    isSelectedSub ? "crimson" : "coral"};
`;

const StyledOliveButton = styled(StyledButton)`
  background-color: olive;
`;
```


## 079_【練習&解答】styled−components
[toTop](#)

- サンプルコード：[045_practice_css_in_js](./src/045_practice_css_in_js/end/)

## 080_【まとめ】Reactでのスタイルの適用方法
[toTop](#)


## 081_【付録】ReactでのCSSフレームワーク【Part．1】
[toTop](#)

- CSSフレームワークの紹介
  - ChakuraUI：スタイリングされたコンポーネント単位で利用する
  - MaterialUI：（同情）
  - Bootstrap5：要素にクラス名を付けてスタイリングする
    * Banilla JavaScriptと同じように使える
  - Bluma：（同上）
  - Tailwind CSS：（同上）ただし、細分化されたクラス名を利用できる


## 082_【付録】ChakraUIを使ってみよう【Part．2】
[toTop](#)

- サンプルコード：[050_chakra_ui](./src/050_chakra_ui/end/)


### インストール方法

- ライブラリインストール方法
```sh
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

- `create-react-app`で詠み込む場合
```sh
npx create-react-app my-app --template @chakra-ui
# npx create-react-app my-app --template @chakra-ui/typescript # TypeScript利用の場合
```

### 利用方法
- インポートは、`@chakra-ui/react`から詠み込む

```jsx
/* POINT Chakra UIのインポート
https://chakra-ui.com/
*/
import { ChakraProvider } from "@chakra-ui/react";

import Todo from "./components/Todo";

const Example = () => {
  // POINT Chakra UIを使用するためにChakraProviderでラップする
  return (
    <>
      <ChakraProvider>
        <Todo />
      </ChakraProvider>
    </>
  );
};

export default Example;
```




## 083_【付録】ChakraUIを使ってみよう【Part．3】
[toTop](#)

