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

- このセクションではスタイルの当て方を紹介
- スタイリング方法の種類：
  * CSSファイルの読み込み
  * インラインスタイル
  * CSS Modules
  * CSS in JavaScript（`CSS−in−JS`）
- このほか、スタイリングライブラリ[Chakura-UI](https://chakra-ui.com/)を使った開発も紹介

## 073_インラインスタイルの使い方！
[toTop](#)

- インラインスタイル：コンポーネントに`style`属性で指定する方法
- デメリットが多い：
  * 再利用性が低い
  * 疑似要素やメディアクエリが使用できない
  * レンダリングの度に計算されるのでパフォーマンスが劣る
  * 動的で頻繁に計算されるスタイルの適用

### ソースコード
- [end source](./src/010_inline_style/end/Example.jsx)
- エントリーコンポーネント：
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
    margin: "auto", // 配置を左右中央にする
    // "border-radius": "9999px",
    borderRadius: "9999px", // 要素の角を丸くする（`50%`と同等）
    border: "none", // 枠線付けない
    display: "block", // ブロック表示

    /* POINT 単位を書かない場合
    単位を書かずに文字列ではなく数字を与えてあげると、reactが自動で解釈し値にpxを付けてくれます。 */
    width: 120,
    height: 60,
    fontWeight: "bold",
    cursor: "pointer",

    /* POINT 三項演算子を使用して isSelected が true の場合は 'pink' false の場合は空文字( '' ) を与えています。
    valueに空文字を与えた場合プロパティは適応されません。 */
    backgroundColor: isSelected ? "pink" : "",
    /* POINT 直接記述することによって可読性が大きく低下するので、可読性が向上する方法を考えて実装してみよう */
  };


  return (
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

### ソースコード
- [end source](./src/020_import_css/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

import SubButton from "./components/SubButton";
import "./Example.css";

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

- 将来、非推奨になる可能性があるため**参考に紹介**
  * 代わりに`CSS-in-JS`などの利用が推奨されている
- CSSファイルをスタイルモジュールとして読み込む

### ソースコード
- [end source](./src/030_css_module/end/Example.jsx)
- エントリーコンポーネント：
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
import styles from "./Example.module.css";

// console.log(styles);

const Example = () => {
  const [isSelected, setIsSelected] = useState(false);

  const clickHandler = () => setIsSelected((prev) => !prev);

  return (
    <>
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

- `Subbutton`コンポーネント：
```jsx
import styles from "./SubButton.module.css";

const SubButton = () => {
    return <button className={styles.btn}>サブボタン</button>
}

export default SubButton;
```

### CSSモジュール
- `Example.module.css`
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

.selected {
    background-color: pink;
}
```

- `SubBotton.module.css`：
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
    background: orange;
}

.btn:hover {
    background-color: red;
}

.btn:active {
    background-color: purple;
}

.selected {
    background-color: pink;
}

@media (max-width: 600px) {
    .btn {
        border-radius: 0;
    }
}
```


## 077_【styled−components】CSS−in−JSを使ったスタイリング
[toTop](#)

- `CSS-in-JS`は、JavaScript内にCSSを記述するスタイリングの総称
  * ライブラリを利用（例：`styled-components`や`Emotion`）
- サンプルコード：[040_css_in_js](./src/040_css_in_js/end/)

### ライブラリインストール
```sh
pnpm i styled-components -S
```

### `styled-components`実装内容
- 生成する要素を指定し、スタイルをテンプレートリテラルで記述
- テンプレートリテラル内はCSSの書き方で記述できる = CSSファイル内容をコピペできる
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
  * 参考）MDN『[テンプレートリテラル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Template_literals)』
- スタイルを定義したオブジェクトを継承して、追加スタイル・変更を行える（次節）


### ソースコード
- [end source](./src/040_css_in_js/end/Example.jsx)
- エントリーコンポーネント：
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

### 練習問題
- 記述を変更し、完成コードと同じ状態になるようにしてください。
  * Q1. FirstButtonのbackgroudをpinkにしてください。
  * Q2. FirstButtonを継承したSecondButtonを作成し、backgroudをredに、colorをwhiteにしてください。
  * Q3. SecondButtonを継承したThirdButtonを作成し、props.darkがある場合のみbackgroudがblackに、ない場合はgreenになるようにしてください。
- [start source](./src/045_practice_css_in_js/start/Example.jsx)

#### 試行問題
```jsx
import styled from "styled-components";

const FirstButton = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  border: none;
`;

const SecondButton = styled(FirstButton)`
  background-color: red;
  color: white;
`;

const ThirdButton = styled(SecondButton)`
  background-color: ${({ dark }) =>
    dark ? "crimson" : "coral"};
`;

const Example = () => {
  return (
    <>
      <h3>練習問題</h3>
      <p>
        記述を変更し、完成コードと同じ状態になるようにしてください。
        <ul>
          <li>Q1. FirstButtonのbackgroudをpinkにしてください。</li>
          <li>
            Q2.
            FirstButtonを継承したSecondButtonを作成し、backgroudをredに、colorをwhiteにしてください。{" "}
          </li>
          <li>
            Q3.
            SecondButtonを継承したThirdButtonを作成し、props.darkがある場合のみbackgroudがblackに、ない場合はgreenになるようにしてください。
          </li>
        </ul>
      </p>
      <div>
        <FirstButton style="backgroundColor: pink">ボタン1</FirstButton>
        <SecondButton>ボタン2</SecondButton>
        <ThirdButton dark>ボタン3(darkあり)</ThirdButton>
        <ThirdButton>ボタン3(darkなし）</ThirdButton>
      </div>
    </>
  );
};

export default Example;
```



### ソースコード
- [end source](./src/045_practice_css_in_js/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import styled from "styled-components";

const FirstButton = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: pink;
  border: none;
`;

const SecondButton = styled(FirstButton)`
  background: red;
  color: white;
`;

const ThirdButton = styled(SecondButton)`
  background: ${(props) => (props.dark ? "black" : "green")};
`;

const Example = () => {
  return (
    <>
      <FirstButton>ボタン1</FirstButton>

      <SecondButton>ボタン2</SecondButton>

      <ThirdButton>ボタン3</ThirdButton>

      <ThirdButton dark>ボタン3</ThirdButton>
    </>
  );
};

export default Example;
```

## 080_【まとめ】Reactでのスタイルの適用方法
[toTop](#)

### CSSファイルの読み込み
- "CSSファイルにclassを定義してJSXの`className`に適用する
- 例）`import "./Example.css"`
- 特徴：
  * グローバルスコープとなるため、ルートファイル(`App.jsx`など)で適用

### インラインスタイル
- JSX内部で、コンポーネントの`style`属性に対してスタイルをオブジェクトで与える
- デメリット多く、あまり利用しない

### CSS Modules
- CSSファイルをモジュールとしてJSファイルに読み込ませる
  * コンポーネント毎にローカルスコープを作って適用できる
  * ただし、将来非推奨になる可能性がある
- 例）`import styles from "./Example.module.css";`

### CSS in JavaScript（`CSS−in−JS`）
- ライブラリを利用して、CSSをJSファイル内に記載し、CSS適したいコンポーネントを自作する
- メリット：
  * クラス名衝突が起きない、
  * CSSとJSが１ファイルにまとまる
  * propsを参照して動的スタイリングも実現する
  * 疑似要素やメディアクエリが使用できる
- 例）
```jsx
import styled from "styled-components";

const FirstButton = styled.button`
  display: inline-block;
  border-radius: 3px;
  width: 11rem;
  background: pink;
`;

const Example = () => {
  return (
    <>
      <FirstButton>ボタン1</FirstButton>
    </>
  );
};

export default Example;
```

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
pnpm i @chakra-ui/react @emotion/react @emotion/styled framer-motion react-icons -S
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

