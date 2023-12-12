[to TopPage](../README.md)

# 05_イベントリスナと状態管理（State）

## 講座一覧
- [041_セクション紹介](#041_セクション紹介)
- [042_イベントに合わせて関数を実行してみよう](#042_イベントに合わせて関数を実行してみよう)
- [043_開発でよく利用するイベントタイプ](#043_開発でよく利用するイベントタイプ)
- [044_イベントに合わせて画面表示を更新してみよう](#044_イベントに合わせて画面表示を更新してみよう)
- [045_【重要】ステートとは？](#045_重要ステートとは)
- [046_【重要】ステートとレンダリングの仕組み](#046_重要ステートとレンダリングの仕組み)
- [047_【複数のステート】ステート使用時の注意点！](#047_複数のステートステート使用時の注意点)
- [048_【更新は即時ではない】ステート使用上の注意点！](#048_更新は即時ではないステート使用上の注意点)
- [049_【練習】ステートの処理を自分で記述してみよう](#049_練習ステートの処理を自分で記述してみよう)
- [050_オブジェクト型のステートを使う際の注意点！](#050_オブジェクト型のステートを使う際の注意点！)
- [051_【重要】オブジェクトのステートは新しいオブジェクトを設定する！](#051_重要オブジェクトのステートは新しいオブジェクトを設定する)
- [052_【練習】オブジェクトのステートを更新](#052_練習オブジェクトのステートを更新)
- [053_配列のステートを使う際の注意点！](#053_配列のステートを使う際の注意点！)
- [054_ステートとコンポーネントの関係](#054_ステートとコンポーネントの関係)
- [055_ステートを複数のコンポーネントで管理しよう！](#055_ステートを複数のコンポーネントで管理しよう！)
- [056_【練習】ステートの受け渡し](#056_練習ステートの受け渡し)
- [057_セクションまとめ](#057_セクションまとめ)


## 041_セクション紹介
[toTop](#)

- こちらのレクチャーではReactの根幹を支えるステートという仕組みとイベントリスナの使い方について紹介


## 042_イベントに合わせて関数を実行してみよう
[toTop](#)

- イベントリスナーは画面を操作したときに発生するイベントに合わせて発火する処理
- JSX内のイベントは要素の属性でイベント（`onClick`など）を付与して、イベントに応じた関数を定義する
  * 属性の名前は、`onClick`・`onChange`・`on`
  * 関数を別で定義しておいた方が読みやすい
    * JSX内にイベント処理を書きすぎると可読性が低下するため
  * 関数の呼び出し側は`()`を付けない。付けると関数の返り値を取得するため

- [end source](./src/010_eventlistener/end/Example.jsx)
- エントリーコンポーネント：
```jsx
const Example = () => {
  const clickHandler = () => {
    alert('ボタンがクリックされました。');
  }
  
  const clickHandler2 = () => {
    console.log('ボタンがクリックされました。');
  }

  // const hello = () => { return 'hello react'};
  
  return (
    <>
    {/* POINT イベントハンドラの末尾に()は付けない */}
    {/* POINT onClickのCは大文字 */}
      <button onClick={clickHandler}>クリックしてね</button>
      <button onClick={clickHandler2}>クリックしてね</button>
      {/* {hello} */}
    </>
  );
};

export default Example;
```

#### 関数に`()`を付けない時の処理
- イベントハンドラーに`()`をしているのは、内部的に関数のコードを呼び出していることになる
  * イベントが発火したときに呼び出したコードを実行してくれる
```jsx
  const hello = () => { return 'hello react'};
  console.log(hello)
//   () => {
//     return "hello react";
//   }
  // `()`をつけると、関数内の`return`が返ってくる
  console.log(hello())
//  hello react
```


## 043_開発でよく利用するイベントタイプ
[toTop](#)

### よく利用するイベントタイプ
  * `onClick`：要素をクリックしたときのイベント
  * `onChange`：input要素の内容が変化したタイミング
  * `onBlur`：input要素のfocusが外れたときのイベント
  * `onFocus`：input要素がfocusされたときのイベント

### イベント発火時の処理方法
- `onChange`などのイベントハンドラは引数`e`が渡される
  * `e`に対してイベントの内容を判定して処理する
  * POINT `e.target.value`などで入力値を取得

- [end source](./src/015_other_events/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import "./Example.css";

/* POINT イベントリスナの登録方法 */
const Example = () => {
  return (
    <div>
      <h3>コンソールを確認してください。</h3>
      <label>
        入力値のイベント：
        <input
          type="text"
          onChange={() => console.log("onChange検知")}
          onBlur={() => console.log("onBlur検知")}
          onFocus={() => console.log("onFocus検知")}
        />
      </label>
      {/* POINT e.target.valueで入力値を取得 */}
      <div>
        <label>
          入力値を取得：
          <input type="text" onChange={(e) => console.log(e.target.value)} />
        </label>
      </div>
      {/* POINT 複数のイベントを登録 */}
      <div
        className="hover-event"
        onMouseEnter={() => console.log("カーソルが入ってきました。")}
        onMouseLeave={() => console.log("カーソルが出ていきました。")}
      >
        ホバーしてね！
      </div>
    </div>
  );
};

export default Example;
```

### KeyBoardイベント
- `e.target.value`で入力値を取得
```jsx
import "./Example.css";

/* POINT イベントリスナの登録方法 */
const Example = () => {
  return (
    <div>
      {/* POINT e.target.valueで入力値を取得 */}
      <div>
        <label>
          入力値を取得：
          <input type="text" onChange={(e) => console.log(e.target.value)} />
        </label>
      </div>
    </div>
  );
};

export default Example;
```

### Mouseイベント
- `onMouseEnter`：要素をホバーしたときのイベント
- `onMouseLeave`：マウスホバーが外れた時のイベント
- POINT 複数のイベントを登録する（EnterとLeave）
```jsx
import "./Example.css";

const Example = () => {
  return (
      {/* POINT 複数のイベントを登録 */}
      <div
        className="hover-event"
        onMouseEnter={() => console.log("カーソルが入ってきました。")}
        onMouseLeave={() => console.log("カーソルが出ていきました。")}
      >
        ホバーしてね！
      </div>
    </div>
  );
};

export default Example;
```



## 044_イベントに合わせて画面表示を更新してみよう
[toTop](#)

- 例として、input要素の`onChange`イベントで状態を読み取り表示する
- `useState`を利用する
  * POINT useStateは[ 値、変更用の関数 ]を返す
  * POINT useStateの返り値は分割代入で取得
- [end source](./src/020_useState/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

const Example = () => {
  // POINT useStateは[ 値、変更用の関数 ]を返す
  // let valArry = useState();
  // POINT 分割代入で取得
  let [val, setVal] = useState();

  return (
    <>
      <input
        type="text"
        /* POINT 入力状態をstateで管理する標準的な書き方 */
        onChange={(e) => {
          // const setFn = valArry[1];
          setVal(e.target.value);
        }}
      />
      = {val}
    </>
  );
};

export default Example;
```

## 045_【重要】ステートとは？
[toTop](#)

- ステートとは、画面の状態を保持する機能
  * input要素で取得した値を直接表示しても、表示されない
  * 下のコードを実装しても値は表示されない
    * 関数内の変更を更新するには関数をもう一度実行しないといけない
```jsx
  return (
    <>
      <input
        type="text"
        /* POINT 入力状態をstateで管理する標準的な書き方 */
        onChange={(e) => {
          displayVal = e.target.value;
        }}
      />
      = {displayVal} {/* これは表示されないパタン */}
    </>
  );
```
* ステート自体を更新することで画面に反映できる
  * **再レンダリングする**ため、状態保持する場所をステートと呼ぶ
  * Reactの接続（Hook into）という機能を使っている
* ステートはコンポーネントごとに所持している


## 046_【重要】ステートとレンダリングの仕組み
[toTop](#)

- `useState`から作られる`setVal(xx)`関数は、状態のセットと画面の再レンダリングを指示している
  * 下のコードをすると『再レンダリングされました』がイベントごとにコンソールに表示される
- [end source](./src/030_useState_render/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

const Example = () => {
  // let displayVal;
  let [ val, setVal ] = useState();
  console.log('再レンダリングされました（at start）');
  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          console.log(e.target.value);
          setVal(e.target.value);
          // displayVal = e.target.value;
        }}
      />
      = {val}
    </>
  );
};

export default Example;
```
## 047_【複数のステート】ステート使用時の注意点！
[toTop](#)

- 画面内に複数ステートがある場合は、更新用関数に紐づく変数を`useState`でステートを作る必要がある
- `useState`は関数内のトップレベルで定義する必要がある
- `useState`の定義はJSX内の変数順にする必要がある
- [end source](./src/040_multiple_state/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

/* POINT 複数のstateの管理と使用上の注意点
 */
const Example = () => {
  /* POINT stateはトップレベル（if文などで囲まない）で呼ぶ
  */
  /* POINT 複数のstateを取り扱う場合はそれぞれ名前を変更可能。 */
  console.log(<Example/>)
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(10);
  const [countC, setCountC] = useState(100);

  /* POINT stateが呼ばれる順番は常に一定とする!
  */
  
  return (
    <>
      <p>ボタンAを{countA}回押しました！</p>
      <button onClick={() => setCountA(countA + 1)}>ボタンA</button>
      <p>ボタンBを{countB}回押しました！</p>
      <button onClick={() => setCountB(countB + 1)}>ボタンB</button>
      <p>ボタンCを{countC}回押しました！</p>
      <button onClick={() => setCountC(countC + 1)}>ボタンC</button>
    </>
  );
};

export default Example;
```


## 048_【更新は即時ではない】ステート使用上の注意点！
[toTop](#)

- サンプルコード：[Example.js](./src/050_prev_state/end/Example.js)
- ステートの特性：
  * POINT stateの更新は予約される（すぐには更新されない。）
  * POINT 更新予定のstateの値の取得は、更新関数の第一引数にわたる
    * なので、更新関数`setCount`内で、更新される状態を`return`する
- [end source](./src/050_prev_state/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

/* 
POINT stateの更新は予約される（すぐには更新されない。）
POINT 更新予定のstateの値の取得方法
*/
const Example = () => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount(count + 1);
    setCount(prevstate /* 現在のstateの値 */ => {
      return prevstate + 1; /* 次のstateの値 */
    } );
    console.log(count);
  };
  const countDown = () => {
    setCount(count - 1);
  };
  return (
    <>
      <p>現在のカウント数: {count}</p>
      <button
        onClick={countUp}
      >+</button>
      <button
        onClick={countDown}
      >-</button>
    </>
  );
};

export default Example;
```

## 049_【練習】ステートの処理を自分で記述してみよう
[toTop](#)

- サンプルコード：[Example.js](./src/055_practice_state/end/Example.js)
  * ステートの処理は、イベントハンドラ内で、更新用関数を呼び出してステートを呼び出す

- [end source](./src/055_practice_state/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from 'react';

const Example = () => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount(state => state + 1);
  };

  const countDown = () => {
    setCount(state => state - 1);
  };
  return (
    <>
      <h3>練習問題</h3>
      <p>現在のカウント数: {count}</p>
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  );
};

export default Example;
```

## 050_オブジェクト型のステートを使う際の注意点！
[toTop](#)

- プリミティブ型とオブジェクト型との違いを留意する
  * POINT プリミティブ型：1, "str", bool, 10n, Symbol(), null, undefined
  * POINT オブジェクト型：{}, []などのプリミティブ型以外
  * POINT オブジェクト型のstateを変更する場合には必ず新しいオブジェクトを作成する！
    * オブジェクトとの一部のみを更新する場合は、スプレッド演算子を利用する
- [end source](./src/060_state_object/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";
// POINT プリミティブ型：1, "str", bool, 10n, Symbol(), null, undefined
// POINT オブジェクト型：{}, []などのプリミティブ型以外
// POINT オブジェクト型のstateを変更する場合には必ず新しいオブジェクトを作成する！
const Example = () => {
  const personObj = { name: "Tom", age: 18 };
  const [person, setPerson] = useState(personObj);

  const changeName = (e) => {
    person.name = '';
    console.log({ ...person, name: e.target.value, age: 20 })
    // setPerson({ name: e.target.value, age: person.age })
    setPerson({ ...person, name: e.target.value })
  }
  const changeAge = (e) => {
    setPerson({ name: person.name, age: e.target.value })
  }
  const reset = () => {
    setPerson({ name: "", age: "" })
  }
  return (<>
    <h3>Name:{person.name}</h3>
    <h3>Age:{person.age}</h3>
    <input type="text" value={person.name} onChange={changeName} />
    <input type="number" value={person.age} onChange={changeAge} />
    <div>
      <button onClick={reset}>リセット</button>
    </div>
  </>);
};

export default Example;
```


## 051_【重要】オブジェクトのステートは新しいオブジェクトを設定する！
[toTop](#)

- オブジェクト型の変数を更新する場合の注意点：
  * 一部のみを更新する場合は、スプレッド演算子を利用する（前述）
  * スプレッド演算子を利用しない場合は更新されない
    * 一部のみは更新できない
    * 更新するには別のオブジェクトを定義する
```jsx
  const changeName = (e) => {
    person.name = e.target.value;
    // setPerson(person); // これでは更新されない
    // 下は更新される書き方
    // setPerson({ name: e.target.value, age: person.age })
    // スプレッド演算子を利用すると、新規にオブジェクトを定義できる
    setPerson({ ...person, name: e.target.value })
  }
```

- [end source](./src/064_state_array/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

// POINT 配列のstateの扱い方
const Example = () => {
  const [nums, setNums] = useState([1, 2, 3, 4, 5]);

  const shuffle = () => {
    const newNums = [ ...nums ];
    const lastVal = newNums.pop();
    newNums.unshift(lastVal);
    setNums(newNums);
  }
  return (
    <>
      <h1>{nums}</h1>
      <button onClick={shuffle}>shuffle</button>
    </>
  );
};

export default Example;
```

## 052_【練習】オブジェクトのステートを更新
[toTop](#)

* スプレッド演算子を利用した記述を練習する
- [end source](./src/068_practice_obj_state/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from 'react';

const Example = () => {
  const orderObj = { item: 'apple', count: 10 };
  const [order, setOrder] = useState(orderObj);
  const changeItem = (e) => {
    // POINT オブジェクトを複製して新しいオブジェクトを生成
    setOrder(order => ({ ...order, item: e.target.value }));
  };
  const countUp = () => {
    setOrder(order => ({ ...order, count: order.count + 1 }));
  };
  const countDown = () => {
    setOrder(order => ({ ...order, count: order.count - 1 }));
  };
  return (
    <>
      <h3>Item:{order.item}</h3>
      <h3>Count:{order.count}</h3>
      <input type="text" value={order.item} onChange={changeItem} />
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  );
};

export default Example;
```

## 053_配列のステートを使う際の注意点！
[toTop](#)

- 配列の場合、配列全体を更新したい場合がある。
  * このときスプレッド演算子を利用するのが難しい
  * そのため、配列では一度、更新する配列を作成（`const newNums`）して、それで更新関数を呼び出す(`setNums(newNums)`)
- [end source](./src/064_state_array/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

// POINT 配列のstateの扱い方
const Example = () => {
  const [nums, setNums] = useState([1, 2, 3, 4, 5]);

  const shuffle = () => {
    const newNums = [ ...nums ];
    const lastVal = newNums.pop();
    newNums.unshift(lastVal);
    setNums(newNums);
  }
  return (
    <>
      <h1>{nums}</h1>
      <button onClick={shuffle}>shuffle</button>
    </>
  );
};

export default Example;
```

## 054_ステートとコンポーネントの関係
[toTop](#)

- [end source](./src/070_state_and_component/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

// POINT stateとコンポーネントの関係
const Example = () => {
  const [ toggle, setToggle ] = useState(true);
  const toggleComponent = () => {
    setToggle(prev => !prev);
  }
  return (
    <>
    {/* POINT コンポーネントの位置によってstateが識別される */}
    <button onClick={toggleComponent}>toggle</button>
    {toggle ? <Count key="A" title="A"/> : <Count key="B" title="B"/>}
    {/* <Count title="A"/>
    {toggle && <Count title="B"/>} */}
    </>
  )
}
const Count = ({ title }) => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount((prevstate) => prevstate + 1);
  };
  const countDown = () => {
    setCount(count - 1);
  };
  return (
    <>
      <h3>{title}: {count}</h3>
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  );
};

export default Example;
```

## 055_ステートを複数のコンポーネントで管理しよう！
[toTop](#)

- 親コンポーネントで複数のステートを定義して、"ステートオブジェクト"と"setメソッド"を渡すと子コンポーネントで利用できる
- [end source](./src/080_state_and_props/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

// POINT stateとpropsの利用ケース
// コンポーネントが消滅する可能性がある時。
// 特定のstateを複数の子コンポーネントで共有したいとき。

const Example = () => {
  const [toggle, setToggle] = useState(true);
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);
  const toggleComponent = () => {
    setToggle((prev) => !prev);
  };
  return (
    <>
      <button onClick={toggleComponent}>toggle</button>
      {toggle ? <Count key="A" title="A" count={countA} setCount={setCountA} /> : <Count key="B" title="B" count={countB} setCount={setCountB} />}
    </>
  );
};
const Count = ({ title, count, setCount }) => {
  const countUp = () => {
    setCount((prevstate) => prevstate + 1);
  };
  const countDown = () => {
    setCount(count - 1);
  };
  return (
    <>
      <h3>
        {title}: {count}
      </h3>
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  );
};

export default Example;
```


## 056_【練習】ステートの受け渡し
[toTop](#)

- 複数階層のコンポーネントで、ステートを分離する練習を行う

- [end source](./src/090_practice_state_props/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

const Example = () => {
    const [ count, setCount ] = useState(0);

    return (
      <>
        <CountResult title="カウント" count={count} />
        <CountUpdate setCount={setCount} />
      </>
    );
  };
  const CountResult = ({ title, count }) => <h3>{title}: {count}</h3>

  const CountUpdate = ({ setCount }) => {
    const countUp = () => {
        setCount(prev => prev + 1);
    };
    const countDown = () => {
        setCount(prev => prev - 1);
    };
    return (
      <>
        <button onClick={countUp}>+</button>
        <button onClick={countDown}>-</button>
      </>
    );
  };
  
  export default Example;
  ```

## 057_セクションまとめ
[toTop](#)

