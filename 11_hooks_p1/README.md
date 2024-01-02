[to TopPage](../README.md)

# 11\_【ReactHooks】様々な状態管理の方法

## 講座一覧

- [111\_セクション紹介](#111_セクション紹介)
- [112_useReducer を使ってみよう](#112_usereducer-を使ってみよう)
- [113_useReducer と useState の違い](#113_usereducer-と-usestate-の違い)
- [114_useReducer と useState の違い（関数型プログラミング視点）](#114_usereducer-と-usestate-の違い関数型プログラミング視点)
- [115_【練習＆解答】useReducer](#115_練習＆解答usereducer)
- [116_useContext でグローバルな値を管理しよう](#116_usecontext-でグローバルな値を管理しよう)
- [117_useContext で state を管理してみよう](#117_useContextでstateを管理してみよう)
- [118_useContext のリファクタリングをしてみよう](#118_usecontext-のリファクタリングをしてみよう)
- [119_useContext を使う際の注意点！](#119_useContextを使う際の注意点！)
- [120_useContext と useReducer を組み合わせて使ってみよう](#120_useContextとuseReducerを組み合わせて使ってみよう)
- [121\_【練習＆解答】useContext と useReducer](#121_練習＆解答usecontext-と-usereducer)
- [122\_【練習】useContext と useReducer](#122_練習usecontext-と-usereducer)
- [123\_【解答】useContext と useReducer](#123_解答usecontext-と-usereducer)
- [124\_【解答続き】useContext と useReducer](#124_解答続きusecontext-と-usereducer)

## 111\_セクション紹介

[toTop](#)

- `useReducer`と`useContext`というReact Hooksの使い方を紹介
  * `useReducer`とは、`useState`の書き換えのような使い方をする
  * `useContext`は、コンポネント間でステートを共有する機能を持つ

## 112_useReducer を使ってみよう
[toTop](#)

- `useRecuder`は、`useState`の代わりとして使うReact Hooks
- 本セクションでは、`useState`から`useReducer`への書き換え例　と　メリットを紹介

### 両 Hooks の違い

#### `useState`の場合

```jsx
import { useState } from "react";

const Example = () => {
  const [state, setState] = useState(0);
  const countUp = () => {
    setState((prev) => ++prev);
  };
  return (
    <>
      <div>
        <h3>{state}</h3>
        <button onClick={countUp}>+</button>
      </div>
    </>
  );
};
```

#### `useReducer`の場合

- `useReducer`では、初期値と処理を一度に定義できる

```jsx
import { useReducere } from "react";
/* POINT useReducerの使い方
const [state, dispatch] = useReducer(reducer, initialArg, init)
reducer(state, action)
*/
// POINT useReducerはuseStateの書き換えに使用
const Example = () => {
  const [rstate, dispatch] = useReducer((prev) => ++prev, 0);
  const rcountUp = () => {
    dispatch();
  };
  return (
    <>
      <div>
        <h3>{rstate}</h3>
        <button onClick={rcountUp}>+</button>
      </div>
    </>
  );
};
```

#### `useReducer`の発展形

- `useReducer`では、複雑な処理を一度に定義できる
  - coutUp と countDown を実装してみる
  - 処理内容を引数（`action`）で指定する
    - 一般的には分岐は`switch`文を使う。
    - `action`はオブジェクトで書く。条件指示のプロパティは`type`と定義する
  ```jsx
  // const [state, dispatch] = useReducer(reducer, initialArg, init)
  const [rstate, dispatch] = useReducer((prev, { type, step }) => {
    switch (type) {
      case "+":
        return prev + step; 
      case "-":
        return prev - step;
      default:
        throw new Error('不明なactionです。')
    }
  }, 0);
  ```
  - `useReducer`は`Redux`の影響を受けているため、似た引数定義となっている

- 下はcountUpとcountDownを定義した例：
```jsx
import { useReducer } from "react";
/* POINT useReducerの使い方
const [state, dispatch] = useReducer(reducer, initialArg, init)
reducer(state, action)
*/
// POINT useReducerはuseStateの書き換えに使用
const Example = () => {
  const [rstate, dispatch] = useReducer((prev, action) => {
    if (action === "+") {
      return ++prev;
    } else if (action === "-") {
      return --prev;
    }
  }, 0);

  const rcountUp = () => {
    dispatch("+");
  };
  const rcountDown = () => {
    dispatch("-");
  };
  return (
    <>
      <div>
        <h3>{rstate}</h3>
        <button onClick={rcountUp}>+</button>
        <button onClick={rcountDown}>-</button>
      </div>
    </>
  );
};
```


### ソースコード
- [end source](./src/010_useState_to_useReducer/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useReducer, useState } from "react";
/* POINT useReducerの使い方
const [state, dispatch] = useReducer(reducer, initialArg, init)
reducer(state, action)
*/
// POINT useReducerはuseStateの書き換えに使用
const Example = () => {
  const [state, setState] = useState(0);
  const [rstate, dispatch] = useReducer((prev, { type, step }) => {
    switch (type) {
      case "+":
        return prev + step; 
      case "-":
        return prev - step;
      default:
        throw new Error('不明なactionです。')
    }
    // if (action === "+") {
    //   return ++prev;
    // } else if (action === "-") {
    //   return --prev;
    // }
  }, 0);

  const countUp = () => {
    setState((prev) => ++prev);
  };
  const rcountUp = () => {
    dispatch({ type: "+", step: 2 });
  };
  const rcountDown = () => {
    dispatch({ type: "-", step: 3 });
  };
  return (
    <>
      <div>
        <h3>{state}</h3>
        <button onClick={countUp}>+</button>
      </div>
      <div>
        <h3>{rstate}</h3>
        <button onClick={rcountUp}>+</button>
        <button onClick={rcountDown}>-</button>
      </div>
    </>
  );
};

export default Example;
```

## 113_useReducer と useState の違い

[toTop](#)

- プログラム観点での`useReducer`のメリット
  - `useState` ：状態の更新の仕方は利用側に託す
    - （状態定義と状態の更新定義を別々に行う）
  - `useReduer`：状態の定義と更新の仕方も状態側で担当する
- 状態と処理の分離とは：
  * `useState`では、値の更新のみ行うので、処理を加えるのはユーザが実装する
    * `useState`で定義した場合：手続き型（ケースごとの）定義が必要となる
    ```jsx
    const countUp = () => {
      setState((prev) => ++prev);
    };
    const countDown = () => {
      setState((prev) => --prev);
    };
    ```
    * `useReducer`を使うと、統一の関数で引数で切り替えができる
    * 複数人の開発をしていると、`dispatch`を定義すれば処理の変更を回避できる
    ```jsx
    // countUpとcountDownのどちらも、dispatch（というreducer）を呼び出す
    const rcountUp = () => {
      dispatch({ type: "+", step: 2 });
    };
    const rcountDown = () => {
      dispatch({ type: "-", step: 3 });
    };
    ```

### ソースコード
- [end source](./src/020_useReducer_pros/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useReducer, useState } from "react";

// POINT useReducerとuseStateの違い
const Example = () => {
  const [state, setState] = useState(0);
  const [rstate, dispatch] = useReducer((prev, { type, step }) => {
    switch (type) {
      case "+":
        return prev + step;
      case "-":
        return prev - step;
      default:
        throw new Error('不明なactionです。')
    }
    // if (action === "+") {
    //   return ++prev;
    // } else if (action === "-") {
    //   return --prev;
    // }
  }, 0);

  const countUp = () => {
    setState((prev) => ++prev);
  };
  const countDown = () => {
    setState((prev) => --prev);
  };
  const rcountUp = () => {
    dispatch({ type: "+", step: 2 });
  };
  const rcountDown = () => {
    dispatch({ type: "-", step: 3 });
  };
  return (
    <>
      <div>
        <h3>{state}</h3>
        <button onClick={countUp}>+</button>
        <button onClick={countDown}>-</button>
      </div>
      <div>
        <h3>{rstate}</h3>
        <button onClick={rcountUp}>+</button>
        <button onClick={rcountDown}>-</button>
      </div>
    </>
  );
};

export default Example;
```


## 114_useReducer と useState の違い（関数型プログラミング視点）

[toTop](#)

- 状態と処理の分離：
  - `useState` ：コンポーネントで更新用の処理を担当
  - `useReduer`：state と一緒に更新用の処理を保持
    - ただし、実装は更新処理を分離（関数定義にできる）
### 純粋性（純粋関数）：
- 純粋性とは「特定の引数に特定の戻り値を返すこと」
  * `useState`で定義した場合：手続き型（ケースごとの）定義が必要となる
  * `useReducer`を使うと、統一の関数で引数で切り替えができる
  * 純粋関数の場合は単体テストができる
  * プログラムが複雑になるほど、`useState`より`useReducer`や`Redux`のメリットが活きる


### 不変性
- 不変性：不変性とは、関数引数を変更しないこと
  * もし、`useReducer`内でステート更新したいときは、新たなステートを定義する

### 純粋関数で定義するサンプル
- `useReducer`は純粋関数で定義できるので、下のように、第一引数のCallbackを別にも実装できる
```jsx
// reducerは、引数によって処理が決定するので、純粋関数
const reducer = (prev, { type, step }) => {
    switch (type) {
      case "+":
        return prev + step;
      case "-":
        return prev - step;
      default:
        throw new Error('不明なactionです。')
    }

    // もし、reducer内で新たなステートを作りたいときは定義する
    // const newState = { ...prev }
}
// POINT useReducerとuseStateの違い
const Example = () => {
  const [rstate, dispatch] = useReducer(reducer, 0);
...
}
```


## 115_【練習＆解答】useReducer

[toTop](#)


### 練習問題
- useReducerを使って完成コードと同じ機能を作成してください。
  * 数値（`a`と`b`）を入力して、演算子を選ぶと、結果を表示するアプリ
- [start source](./src/025_practice_useReducer/start/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useReducer } from "react";

const CALC_OPTIONS = ["add", "minus", "divide", "multiply"];

const reducer = () => {}

const Example = () => {
  const initState = {
    a: 1,
    b: 2,
    result: 3,
  };

  const [state, dispatch] = useReducer(reducer, initState);

  const calculate = (e) => {
    
  };

  const numChangeHandler = (e) => {
    
  }

  return (
    <>
    <h3>練習問題</h3>
    <p>useReducerを使って完成コードと同じ機能を作成してください。</p>
      {/* <div>
        a:
        <input
          type="number"
          name="a"
          value={state.a}
          onChange={numChangeHandler}
        />
      </div>
      <div>
        b:
        <input
          type="number"
          name="b"
          value={state.b}
          onChange={numChangeHandler}
        />
      </div>
      <select value={state.type} onChange={calculate}>
      </select>
      <h1>結果：{state.result}</h1> */}
    </>
  );
};

export default Example;
```

### 試案
- JSX以外のコンポーネントの定義
```jsx
import { useReducer } from "react";

const CALC_OPTIONS = ["add", "minus", "divide", "multiply"];

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "change": {
      const { name, value } = payload;
      // return { ...state, [name]: value };
      return { ...state, [name]: Number(value) };
    }
    case "add": {
      const newResult = state.a + state.b;
      return { ...state, result: newResult };
    }
    ...
    default : {
      throw new Error("operator is invalid");
    }
  }
};

const Example = () => {
  const initState = {
    a: 1,
    b: 2,
    result: 3,
  };

  const [state, dispatch] = useReducer(reducer, initState);

  const calculate = (e) => {
    // dispatch(state, { e.type , {}}); // wrong;
    dispatch({type: e.target.value});
  };

  const numChangeHandler = (e) => {
    // dispatch(state, { "change", { e.key, e.valule }}); // wrong
    dispatch({
      type: "change",
      payload: {name: e.target.name, value: e.target.value}
    });
  };

  return (...);
}

export default Example;
```

### ソースコード
- [end source](./src/025_practice_useReducer/end/Example.jsx)
- エントリーコンポーネント：
```jsx
// POINT useReducerの練習問題
import { useReducer } from "react";

const CALC_OPTIONS = ["add", "minus", "divide", "multiply"];

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "change": {
      const { name, value } = payload;
      return { ...state, [name]: value };
    }
    case "add": {
      return { ...state, result: state.a + state.b };
    }
    case "minus": {
      return { ...state, result: state.a - state.b };
    }
    case "divide": {
      return { ...state, result: state.a / state.b };
    }
    case "multiply": {
      return { ...state, result: state.a * state.b };
    }
    default:
      throw new Error("operator is invalid");
  }
};

const Example = () => {
  const initState = {
    a: 1,
    b: 2,
    result: 3,
  };

  const [state, dispatch] = useReducer(reducer, initState);

  const calculate = (e) => {
    dispatch({type: e.target.value});
  };
  const numChangeHandler = (e) => {
    dispatch({type: 'change', payload: {name: e.target.name, value: e.target.value}});
  };
  return (
    <>
      <div>
        a:
        <input
          type="number"
          name="a"
          value={state.a}
          onChange={numChangeHandler}
        />
      </div>
      <div>
        b:
        <input
          type="number"
          name="b"
          value={state.b}
          onChange={numChangeHandler}
        />
      </div>
      <select value={state.type} name="type" onChange={calculate}>
        {CALC_OPTIONS.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <h3>結果：{state.result}</h3>
    </>
  );
};

export default Example;
```


## 116_useContext でグローバルな値を管理しよう

[toTop](#)

- 複数階層のコンポーネントがあるとき、`useContext`使うと`props`のバケツリレーを防ぐことができる
  - `createContext`で登録した値を、`useContext`で参照できる
- 親コンポーネントで`createContext`でステートを作り、`export`しておく
```jsx
export const MyContext = createContext("hello");
```
- 子や孫コンポーネントで、importして`useContext`で参照する
  * importするのは、循環参照とならないよう、定義したContextのみをimportする
```jsx
import { MyContext } from "../Example";
const GrandChild = () => {
  const value = useContext(MyContext);
  return (
    ...
  );
};
```

### ソースコード
- [end source](./src/030_useContext/end/Example.jsx)
- エントリーコンポーネント：
```jsx
// POINT useContextの基礎
import { createContext } from "react";
import Child from "./components/Child";
export const MyContext = createContext("hello");

const Example = () => {
  return <Child />;
};

export default Example;
```

- `Child`コンポーネント：
```jsx
import GrandChild from "./GrandChild";
const Child = () => (
  <div style={{ border: "1px solid black", padding: 10 }}>
    <h3>子コンポーネント</h3>
    <GrandChild />
  </div>
);
export default Child;
```

- `GrandChild`コンポーネント：
```jsx
import { useContext } from "react";
import { MyContext } from "../Example";
const GrandChild = () => {
  const value = useContext(MyContext);
  return (
      <div style={{ border: "1px solid black" }}>
        <h3>孫コンポーネント</h3>
        {value}
      </div>
  );
};
export default GrandChild;
```


## 117_useContext で state を管理してみよう

[toTop](#)

- `useContext`は、props のバケツリレー（`props drilling`）を防ぐために使われる
  - `state`の更新をしたい場合、更新側コンポネントと参照側コンポーネントを含む親コンポーネントで`useState`を定義する

### ソースコード
- `vite`を使っているためか、２コンポーネントから`useContext`で参照するとエラーしてしまう
- [end source](./src/040_useContext_with_state/end/Example.jsx)
- エントリーコンポーネント：
```jsx
// POINT useContextとstate
import { createContext, useState } from "react";
import Child from "./component/Child";
import OtherChild from "./component/OtherChild";

export const MyContext = createContext();

const Example = () => {
  const stateAndSetter = useState(0);
  // stateAndSetter = [ state, setState ]
  return (
    <MyContext.Provider value={stateAndSetter}>
      <Child />
      <OtherChild />
    </MyContext.Provider>
  );
};

export default Example;
```

- `Child`コンポーネント：
```jsx
import GrandChild from "./GrandChild";
const Child = () => (
  <div style={{ border: "1px solid black", padding: 10 }}>
    <h3>子コンポーネント</h3>
    <GrandChild />
  </div>
);
export default Child;
```

- `GrandChild`コンポーネント：
```jsx
import { useContext } from "react";
import { MyContext } from "../Example";
const GrandChild = () => {
  const [value] = useContext(MyContext);
  return (
    <div style={{ border: "1px solid black" }}>
      <h3>孫コンポーネント</h3>
      {value}
    </div>
  );
};
export default GrandChild;
```

- `OtherChild`コンポーネント：
```jsx
import { useContext } from "react";
import { MyContext } from "../Example";
const OtherChild = () => {
  const [, setState] = useContext(MyContext);

  const clickHandler = (e) => {
    setState((prev) => prev + 1);
  };

  return (
    <div style={{ border: "1px solid black" }}>
      <h3>他の子コンポーネント</h3>
      <button onClick={clickHandler}>+</button>
    </div>
  );
};

export default OtherChild;
```


## 118_useContext のリファクタリングをしてみよう
[toTop](#)

- `useState`の利用法を復習しながら、`useContext`のリファクタリング例を示す


### ソースコード
- [end source](./src/050_context_file/end/Example.jsx)
- エントリーコンポーネント：
```jsx
// POINT Contextコードの整理方法

import "./Example.css";
import Main from "./components/Main";
import Header from "./components/Header";
import { ThemeProvider } from "./context/ThemeContext";

const Example = () => {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  );
};

export default Example;
```

- CSS：`Example.css`
```css
main,
header {
  padding: 1rem;
}
.field {
  margin-bottom: 1rem;
}
input[type="radio"] {
  margin-left: 0.5rem;
}

header.content-light {
  color: #000000;
  background-color: #9dbdff;
}
main.content-light {
  color: #000000;
  background-color: #ffffff;
}
header.content-dark {
  color: #ffffff;
  background-color: #535353;
}
main.content-dark {
  color: #ffffff;
  background-color: #747474;
}
header.content-red {
  color: #ffffff;
  background-color: #ff7373;
}
main.content-red {
  color: #ffffff;
  background-color: #ff3636;
}
```

- `ThemePrivider`コンポーネント：
```jsx
import { useState, useContext, createContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState("light");
  
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

- `Header`コンポーネント：
```jsx
import { useTheme } from "../context/ThemeContext"


const Header = () => {
  const [theme, setTheme] = useTheme();

  const THEMES = ["light", "dark", "red"];

  const changeTheme = (e) => setTheme(e.target.value);

  return (
    <header className={`content-${theme}`}>
      {THEMES.map((_theme) => {
        return (
          <label key={_theme}>
            <input
              type="radio"
              value={_theme}
              checked={theme === _theme}
              onChange={changeTheme}
            />
            {_theme}
          </label>
        );
      })}
    </header>
  );
};

export default Header;
```

- `Main`コンポーネント：
```jsx
import { useTheme } from "../context/ThemeContext"

const Main = () => {
  const [theme] = useTheme();

  return (
    <main className={`content-${theme}`}>
      <h1>テーマの切り替え</h1>
    </main>
  );
};

export default Main;
```



## 119_useContext を使う際の注意点！
[toTop](#)

- Contextとレンダリングの関係：
  * `Context.Provider`で複数コンポーネントのステートをつないだ場合、
  * あるコンポーネントで`state`更新すると、複数コンポーネントのレンダリングが行われる
  * 多用するのは避ける。例を示す

### ソースコード
- `vite`を使っているためか、２コンポーネントから`useContext`で参照するとエラーしてしまう
- [end source](./src/060_context_file_render/end/Example.jsx)
- エントリーコンポーネント：
```jsx
// POINT 発展 Contextとレンダリングの関係
import "./Example.css";
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

const Example = () => {

  // console.log('example')
  
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  );
};

export default Example;
```

- CSS：`Example.css`
```css
main,
header {
  padding: 1rem;
}
.field {
  margin-bottom: 1rem;
}
input[type="radio"] {
  margin-left: 0.5rem;
}

header.content-light {
  color: #000000;
  background-color: #9dbdff;
}
main.content-light {
  color: #000000;
  background-color: #ffffff;
}
header.content-dark {
  color: #ffffff;
  background-color: #535353;
}
main.content-dark {
  color: #ffffff;
  background-color: #747474;
}
header.content-red {
  color: #ffffff;
  background-color: #ff7373;
}
main.content-red {
  color: #ffffff;
  background-color: #ff3636;
}
```

- `ThemePrivider`コンポーネント：
```jsx
import { useState, useContext, createContext } from "react";

export const ThemeContext = createContext();
export const ThemeUpdateContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={setTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export const useUpdateTheme = () => useContext(ThemeUpdateContext);
```

- `Header`コンポーネント：
```jsx
import { useTheme, useUpdateTheme } from "../context/ThemeContext"


const Header = () => {
  const theme = useTheme();
  const setTheme = useUpdateTheme();

  const THEMES = ["light", "dark", "red"];

  const changeTheme = (e) => setTheme(e.target.value);

  // console.log('header')

  return (
    <header className={`content-${theme}`}>
      {THEMES.map((_theme) => {
        return (
          <label key={_theme}>
            <input
              type="radio"
              value={_theme}
              checked={theme === _theme}
              onChange={changeTheme}
            />
            {_theme}
          </label>
        );
      })}
    </header>
  );
};

export default Header;
```

- `Main`コンポーネント：
```jsx
import { useTheme } from "../context/ThemeContext"

const Main = () => {
  const theme = useTheme();

  // console.log('main')

  return (
    <main className={`content-${theme}`}>
      <h1>テーマの切り替え</h1>
    </main>
  );
};

export default Main;
```

- `Footer`コンポーネント：
```jsx
// import { useUpdateTheme } from "../context/ThemeContext"

const Footer = () => {
  // const setTheme = useUpdateTheme();
  // console.log('footer')

  return (
    <footer>
      <div>フッター</div>
    </footer>
  );
};

export default Footer;
```

## 120_useContext と useReducer を組み合わせて使ってみよう
[toTop](#)


- [サンプルコード](./src/065_useContext_with_reducer/end/Example.js)

## 121\_【練習＆解答】useContext と useReducer

[toTop](#)

- [サンプルコード（問題）](./src/070_practice_useContext/start/Example.js)
- [サンプルコード（解答）](./src/070_practice_useContext/end/Example.js)

### 問題（初期状態）

- コンポネントを階層にするため、`useContext`を利用する

```jsx
import { useReducer } from "react";

const CALC_OPTIONS = ["add", "minus", "divide", "multiply"];

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "change": {
      const { name, value } = payload;
      return { ...state, [name]: value };
    }
    case "add": {
      // 一部、問題コードに不具合があるが、練習のスコープ外
      // JavaScriptでは`+`は文字列結合が加算より優先されるため、整数へキャストする
      // return { ...state, result: state.a + state.b };
      return { ...state, result: parseInt(state.a) + parseInt(state.b) };
    }
    case "minus": {
      return { ...state, result: state.a - state.b };
    }
    case "divide": {
      return { ...state, result: state.a / state.b };
    }
    case "multiply": {
      return { ...state, result: state.a * state.b };
    }
    default:
      throw new Error("operator is invalid");
  }
};

const Example = () => {
  const initState = {
    a: 1,
    b: 2,
    result: 3,
  };

  const [state, dispatch] = useReducer(reducer, initState);

  const calculate = (e) => {
    dispatch({ type: e.target.value });
  };
  const numChangeHandler = (e) => {
    dispatch({
      type: "change",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  return (
    /* 完成系のJSX */
    // <CalcProvider>
    //   <Input name="a"/>
    //   <Input name="b" />
    //   <Select />
    //   <Result />
    // </CalcProvider>
    <>
      <h3>練習問題</h3>
      <p>
        Example内のコードをコンポーネントに分割してください。また、ステートはContext経由でやり取りしてください。
      </p>
      <div>
        a:
        <input
          type="number"
          name="a"
          value={state.a}
          onChange={numChangeHandler}
        />
      </div>
      <div>
        b:
        <input
          type="number"
          name="b"
          value={state.b}
          onChange={numChangeHandler}
        />
      </div>
      <select value={state.type} name="type" onChange={calculate}>
        {CALC_OPTIONS.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <h3>結果：{state.result}</h3>
    </>
  );
};

export default Example;
```

## 122\_【練習】useContext と useReducer

[toTop](#)

- [サンプルコード（問題）](./src/080_practice_reminder/start/Example.jsx)
- [サンプルコード（解答）](./src/080_practice_reminder/end/Example.js)

### 問題（初期状態）

- List コンポーネント内の各項目を Item コンポーネントに分離しましょう。
- タイトルをダブルクリックするとタイトルを変更出来るようにしましょう
- Reducer と Context を使って Todo をグローバルなステートにしましょう

## 123\_【解答】useContext と useReducer

[toTop](#)

### 問題（初期状態）

- `todos.map(...)`内の JSX を`Item`コンポーネントにする

```jsx
const List = ({ todos, deleteTodo }) => {
  const complete = (id) => {
    deleteTodo(id);
  };
  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <button onClick={() => complete(todo.id)}>完了</button>
            <span>{todo.content}</span>
          </div>
        );
      })}
    </div>
  );
};

export default List;
```

### 解答（それぞれの問題ごとのサンプルコード）

- List コンポーネント内の各項目を Item コンポーネントに分離しましょう。
  - `List.jsx`は下のようにする

```jsx
import Item from "./Item";

const List = ({ todos, deleteTodo }) => {
  const complete = (id) => {
    deleteTodo(id);
  };
  return (
    <div>
      {todos.map((todo) => {
        return <Item key={todo.id} todo={todo} complete={complete} />;
      })}
    </div>
  );
};

export default List;
```

- タイトルをダブルクリックするとタイトルを変更出来るようにしましょう
  - `Item.jsx`を下のようにする

```jsx
import { useState } from "react";

// const Item = ({ todo, complete }) => {
// - `Todo.jsx`で`update`を定義して、それを`prop drilling`してくる
const Item = ({ todo, complete, updateTodo }) => {
  const [ editingContent, setEditingContent] = useState(todo.content);
  const changeContent = (e) => setEditingContent(e.target.value);
  const toggleEditMode = (e) => {
    const newTodo = { ...todo, editing: !todo.editing };
    updateTodo(newTodo);
  }
  return (
    <div key={todo.id}>
      <button onClick={() => complete(todo.id)}>完了</button>
      {
        todo.editing ? (
          <input type="text" value="editingContent"
          onChange={changeContent} />
        ) : (
          <span onDoubleClick={toggleEditMode}>{todo.content}</span>
        )
      }
    </div>
  );
};

export default Item;
```

## 124\_【解答続き】useContext と useReducer

[toTop](#)
