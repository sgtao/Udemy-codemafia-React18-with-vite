[to TopPage](../README.md)

# 10_【発展】関数型プログラミング

## 講座一覧
- [100_セクション紹介](#100_セクション紹介)
- [101_関数型プログラミングとは？](#101_関数型プログラミングとは)
- [102_状態と処理の分離](#102_状態と処理の分離)
- [103_純粋関数](#103_純粋関数)
- [104_不変性（immutability）【Part．1】](#104_不変性immutabilitypart1)
- [105_不変性（immutability）【Part．2】](#105_不変性immutabilitypart2)
- [106_Reactと純粋関数](#106_reactと純粋関数)
- [107_Reactにおける状態と処理の分離](#107_reactにおける状態と処理の分離)
- [108_Reactにおける不変性](#108_reactにおける不変性)
- [109_【まとめ】関数型プログラミング](#109_まとめ関数型プログラミング)
- [110_JavaScriptコードと見比べてみよう](#110_javascriptコードと見比べてみよう)


## 100_セクション紹介
[toTop](#)

* この章では、関数型プログラミングの解説とReact でどう適用されているかを紹介
  - React は16.18.0 で導入されたHooksにより関数型プログラミングに方向が変わったため
  - Reactの思想を学ぶために、関数型プログラミングを理解していく

## 101_関数型プログラミングとは？
[toTop](#)

- _関数型プログラミングとは、（値の）状態と処理を分離して管理
  * A(data) -> B(data) -> C(data) -> 結果
  + 手続き型（命令型）プログラミングと宣言型プログラミング（関数プログラミング）と比較される

 手続き型プログラミング | 宣言型プログラミング
 -- | --
 オブジェクト指向プログラミング | 関数型プログラミング
 命令を手順通り記述していく手法 | 手続き型の制御を（なるべく）関数に分離（隠ぺいする）
 メリット：学習難易度が低い。分業が容易 | メリット：コードの可読性や保守性の向上が可能
 デメリット：コードが肥大化して可読性悪化しやすい | デメリット：学習コストが高く、自分で複雑な事はできない

- 関数型の目標・ポイント
  * 目標：Tree Shaking の向上
    * バルドル時に、未使用判断された断片を除外して、バンドルファイルを軽くする
  * ポイント１．（値の）状態管理と処理を分離する
    * 状態と処理は切り離す
  * ポイント２．純粋関数（副作用を排除する）
    * 特定の入力には特定の出力を返す（応答ルールは一定にする）
  * 普遍性（Immutability）
    * 一度設定した値は書き換えない


## 102_状態と処理の分離
[toTop](#)


- 関数型とは：
  - （値の）状態と処理を分離して管理
  - `A(data) -> B(data) -> C(data) -> 結果``
```jsx
  const nums = [1,2,3]; // 状態
  const sum = (arry) => arry.reduce((accu, curr) => accu + curr) // 処理 -> (結果) -> 状態
  return (
    <>
      <div>関数型:{sum(nums)}</div>
    </>
  )
```

- オブジェクト指向型の場合：
  * 状態（データ）と処理を対で管理
  * `obj.method(); -> 結果`
```jsx
  const numObj = {
    nums: [1,2,3],
    sum() {
      const nums = this.nums;
      let sumValue = 0;
      for(let i = 0; i < nums.length; i++) {
        sumValue += nums[i];
      }
      return sumValue;
    }
  }
  return (
    <>
      <div>オブジェクト指向型:{numObj.sum()}</div>
    </>
  )
```

### ソースコード
- [end source](./src/010_data_procedure/end/Example.jsx)
- エントリーコンポーネント：
```jsx
const Example = () => {
  // POINT 関数型
  // （値の）状態と処理を分離して管理
  // A(data) -> B(data) -> C(data) -> 結果
  // ★ 状態と処理は切り離す
  const nums = [1,2,3];
  const sum = (arry) => arry.reduce((accu, curr) => accu + curr)

  // POINT オブジェクト指向型
  // 状態（データ）と処理を対で管理
  // obj.method(); -> 結果
  const numObj = {
    nums: [1,2,3],
    sum() {
      const nums = this.nums;
      let sumValue = 0;
      for(let i = 0; i < nums.length; i++) {
        sumValue += nums[i];
      }
      return sumValue;
    }
  }

  return (
    <>
      <div>オブジェクト指向型:{numObj.sum()}</div>
      <div>関数型:{sum(nums)}</div>
    </>
  )
};

export default Example;
```



## 103_純粋関数
[toTop](#)

- 関数型（純粋関数）
  * Reactの関数も純粋関数で定義する
* 純粋関数とは数式のようなもの：POINT fn(決まった引数) -> 決まった戻り値
  * POINT 関数外の状態（データ）は参照・変更しない。
    * 引数を起点にして処理をして結果を返す
  * POINT 関数外に影響を及ぼさない。記述をする
  * 引数で渡された値を変更しない。
    * 不変性()
* 上記の要件を満たさない操作は「副作用」と呼ぶ。
  * 外部変数を参照したら副作用
  * 関数内の`console.log`も副作用ととらえられる

### 純粋関数の定義：
```jsx
const Example = () => {
  const val1 = 3, val2 = 9;
  // 純粋関数の定義：
  const add = (val1, val2) = {
    return val1 + val2;
  }

  return (
    <>
      <div>純粋関数:{add(val1, val2)}</div>
    </>
  );
};
```


### 純粋ではない関数の定義：
- 引数以外の変数を参照する・更新する
- `console.log`が入っていると、「純粋関数でない」とみなされる
- ⇒　純粋巻子の定義は厳しいので、現実で開発する際は寛容に判定する

```jsx
const Example = () => {
  const val1 = 3, val2 = 9;
  // 純粋関数ではない定義：
  let result;
  const add = (val1) => {
    console.log(val1); // console.logが入っていると、「純粋関数でない」とみなされる
    result = val1 + val2;
    return val1 + val2;
  }

  return (
    <>
      <div>純粋関数ではない:{add(val1)}</div>
    </>
  );
};

export default Example;
```

### ソースコード
- [end source](./src/020_pure_function/end/Example.jsx)
- エントリーコンポーネント：
```jsx
const Example = () => {
  // 関数型（純粋関数）
  // POINT fn(決まった引数) -> 決まった戻り値
  // POINT 関数外の状態（データ）は参照・変更しない。
  // POINT 関数外に影響を及ぼさない。
  // ・引数で渡された値を変更しない。
  // 不変性()
  // 上記の要件を満たさない操作は「副作用」と呼ぶ。

  const val1 = 3, val2 = 9;
  // 純粋関数の定義：
  const add = (val1, val2) = {
    return val1 + val2;
  }

  // 純粋関数ではない定義：
  // let result;
  // const add = (val1) => {
  //   console.log(val1);
  //   result = val1 + val2;
  //   return val1 + val2;
  // }

  return (
    <>
      {/* <div>純粋関数:{add(val1)}</div> */}
      <div>純粋関数:{add(val1, val2)}</div>
    </>
  );
};

export default Example;
```



## 104_不変性（immutability）【Part．1】
[toTop](#)

- `immutability`とは、引数で渡された値を変更しないこと。
  * 『Immutabilityの保持』と呼ぶ
  * 上記の要件を満たさない操作は「副作用」と呼ぶ。
- 禁止されてる記述法：引数を更新
```jsx
  const num = { val: 2 }

  const double = (num) => {
    num.val = num.val * 2;
    return num;
  }
```
- `immutability`の回避法：関数内で新たな変数を定義する
```jsx
  const num = { val: 2 }

  const double = (num) => {
    // const newNum = { val: num.val * 2 };
    const newNum = { ...num }; // スプレッド演算子でプロパティ名を利用できる
    newNum.val = num.val * 2;
    return newNum;
  }
```


### ソースコード
- [end source](./src/030_immutability/end/Example.jsx)
- エントリーコンポーネント：
```jsx
const Example = () => {
  // 関数型（純粋関数）
  // ・fn(決まった引数) -> 決まった戻り値
  // ・関数外の状態（データ）は参照・変更しない。
  // ・関数外に影響を及ぼさない。
  // POINT 引数で渡された値を変更しない。（Immutabilityの保持）
  // 上記の要件を満たさない操作は「副作用」と呼ぶ。

  const num = { val: 2 }
  
  const double = (num) => {
    const newNum = { val: num.val * 2 };
    // newNum.val = num.val * 2;
    return newNum;
  }

  const newNum = double(num);
  console.log('newNum', newNum, 'num', num)
  console.log(newNum === num);
  return (
    <>
      <div>Immutability</div>
    </>
  );
};

export default Example;
```


## 105_不変性（immutability）【Part．2】
[toTop](#)

- プログラミング上、データはイミュータブルとミュータブルで分類される
  * イミュータブル：Immutabie。書換不可（元の値は変わらない）
    * 例：文字列、数値、BigInt、真偽値、undefined、シンボル
  * ミュータブル：Mutable。元の値が変わる
    * イミュータブルな値以外はミュータブル
    * 例：イミュータブルな値以外。オブジェクト（Object、Arrayなど）
  * 関数の引数がミュータブルの値の場合、参照先の値が新たに作られる
  ```jsx
  // `array`が配列なら、下の処理が許容される
  // この場合、メモリ空間上では、関数内で新たな配列データが準備されて、追加される
  const addArray = (array, addVal) => {
    array.push(addVal);
  }
  ```

- 関数型プログラミングと`Immutability`の保持
  * ミュータブルなオブジェクトをイミュータブルとして取り扱う
  * 関数内で、オブジェクトや配列を変更したとき、新たなデータとして扱われる

## 106_Reactと純粋関数
[toTop](#)

- Reactの関数コンポーネントは純関数として扱われる
  * コンポーネント内の変数は、引数か内部定義した変数で実装する必要がある
  * つまり、Reactで禁止されている記述は、
    * 外部変数の参照禁止される（というか、推奨されない）
  * なので、もし関数コンポーネント内で、外部の変数を参照したいときは`props`で渡す

### ソースコード
- [end source](./src/040_react_pure_fn/end/Example.jsx)
- エントリーコンポーネント：
```jsx
// POINT Reactと純粋関数
let value = 0;

const Child = () => {
  value++; // 推奨されない記述方法
  return <div>{value}</div>
}

const ChildPure = ({ value }) => {
  return <div>{value}</div>
}

const Example = () => {
  let value = 0;

  return (
    <>
      <Child/>
      <Child/>
      <Child/>
      <ChildPure value={++value} />
      <ChildPure value={++value} />
      <ChildPure value={++value} />
    </>
  );
};

export default Example;
```

## 107_Reactにおける状態と処理の分離
[toTop](#)

- Reactの`useState`は純粋関数の定義とは外れる。が実用的な妥協点
  * 純粋関数で記述すると、Rootコンポーネントですべてのステートを定義すればよいが実装しにくい
  * `useState`で、コンポーネント単位で状態管理(state)と処理(関数コンポーネント)の分離できる
  * よって、関数コンポーネントは、`props`と`state`で記述される純関数として実装する
- Reactの関数コンポーネントは、**JSXを作成する場所**と考える
  * 副作用的なものは関数コンポーネント内に記述しない

### ソースコード
- [end source](./src/050_react_data_procedure/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

/* 
POINT Reactでの状態管理(state)と処理(関数コンポーネント)の分離

関数型（純粋関数）
・fn(決まった引数) : propsとstateに依存
  -> 決まった戻り値 : JSX
*/

// ・関数外の状態（データ）は参照・変更しない。
let value = 0;
const Example = () => {
  // 関数コンポーネントはJSXを作成する場所なので、それ以外の処理は書かない。

  // 状態はstateに分離する
  const [ state, setState ] = useState(0);
  
  // 関数外に影響を及ぼさない。
  // window.alert('hello')

  const increment = () => {
    setState(state + 1);
  }
  return (
    <>
      <button onClick={increment}>+</button>
      <h3>{state}</h3>
    </>
  );
};

export default Example;
```

## 108_Reactにおける不変性
[toTop](#)

- 関数コンポーネント内で、やって良いこと／良くないこと
- やって良いこと：
  * 関数型（純粋関数）として定義する
  * ・fn(決まった引数) -> 決まった戻り値 で返す
- 屋って良くないこと：
  - 引数（`props`）で渡された値を変更しない。（★Immutability）
  - 関数外の状態（データ）は参照・変更しない。
    * ＝ つまり、関数外に影響を及ぼさない。

### ソースコード
- [end source](./src/060_react_immutability/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

  // POINT ReactでのImmutability
  // 関数型（純粋関数）
  // ・fn(決まった引数) -> 決まった戻り値
  // ・関数外の状態（データ）は参照・変更しない。
  // ・関数外に影響を及ぼさない。
  // ・引数で渡された値を変更しない。（★Immutability）
const Child = ({ state, setState }) => {
  // setState({ value: 1 })
  // props.state = { value: 1 }

  // immutabilityな関数の記述方法
  // - stateの更新は、propsの`setState`を使って更新している
  const increment = () => {
    setState(prev => {
      const newState = { value: prev.value + 1 }
      // prev.value += 1;
      return newState;
    })
  }
  return (
    <>
      <span>{state.value}</span>
      <button onClick={increment}>+</button>
    </>
  );
};

const Example = () => {
  const [ state, setState ] = useState({ value: 0 });

  return (
    <>
      <div>
        <Child state={state} setState={setState} />
      </div>
    </>
  );
};

export default Example;
```

## 109_【まとめ】関数型プログラミング
[toTop](#)

- Reactは16.8.0のバージョンからHooks導入により関数型プログラミングにシフトした
  - 手続き型（オブジェクト指向型）から、宣言型プログラミング（関数型プログラミング）のルールにしたぐ
  - 手続き型の制御を（なるべく）関数に分離することを推奨される
  * 実際は、手続き型と宣言型が混在した実装になる（宣言型で実装できるけど、強要・制限はされない）
  * 関数型と手続き型の例
  ```jsx
  let nums = [1,2,3];
  // 関数型
  // let doubleNums = nums.map(num => num * 2);

  // 手続き型でも書ける
  let doubleNums = [];
  for (let i = 0; i < nums.length; i++ ) {
    let double = nums[i] * 2;
    doubleNums.push(double);
  }
  ```

* 関数型プログラミングのキーワード
  * （値の）状態管理と処理を分離
  * 純粋関数（副作用を排除する）
  * 不変性（Immutabilityの保持）


## 110_JavaScriptコードと見比べてみよう
[toTop](#)

- 同じコードをJavaScriptとReactとで実装してみて、Reactで実装したときのメリットを示す
  * JavaScriptの場合、JQueryのような実装となる
    * `querySelector`などでDOMを取得
    * 取得DOMそれぞれに逐一処理を定義する必要がある
    * 実装スタイルも、手続き型で実装となる
      * +α、リソース節約のために、未使用タイミングで`e.target.removeEventListener`が必要
  * Reactの場合、コンポーネント単位で分離出来て、処理も直感的に定義できる
    * 特に純粋関数で実装できるので、コードの可読性が良い

### JavaScriptコード
- [start source（JavaScriptコード）)](./src/070_js_vs_react/start/Example.jsx)
```jsx
const todosList = [
  {
    id: 1,
    content: "店予約する",
  },
  {
    id: 2,
    content: "卵買う",
  },
  {
    id: 3,
    content: "郵便出す",
  },
];

const Example = () => {
  const $ = {};

  const init = () => {
    $.app = window.document.querySelector("#todo-js-app");
    $.list = $.app.querySelector(".todo-list");
    $.input = $.app.querySelector(".todo-input");
    $.addBtn = $.app.querySelector(".todo-add-btn");

    $.addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const title = $.input.value;
      if(!title) return;
      const todoItemEl = createTodoElement(title);
      $.list.append(todoItemEl);
    });

    todosList.forEach(({content}) => {
      $.list.append(createTodoElement(content));
    })
  };

  const createTodoElement = (todoTitle) => {
    const todoItemEl = document.createElement("div");

    todoItemEl.innerHTML = `
      <button>完了</button>
      <span>${todoTitle}</span>
    `;

    const removeItemHandler = (e) => {
      e.target.removeEventListener("click", removeItemHandler);
      e.target.parentElement.remove();
    };

    todoItemEl.querySelector("button").addEventListener("click", removeItemHandler);

    return todoItemEl;
  };

  setTimeout(init);

  return (
    <div id="todo-js-app">
      <h2>Reminder</h2>
      <div className="todo-list">
      </div>
      <form className="todo-form">
        <input className="todo-input" type="text" />
        <button className="todo-add-btn">追加</button>
      </form>
    </div>
  );
};

export default Example;
```

### React Code
- [end source](./src/070_js_vs_react/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import Todo from "./components/Todo"

// POINT React vs JS Todo App
const Example = () => {
  return (
    <>
      <h2>Reminder</h2>
      <Todo />
    </>
  );
};

export default Example;
```

- `Todo`コンポーネント：
```jsx
import { useState } from "react";
import List from "./List";
import Form from "./Form";

const Todo = () => {
  const todosList = [
    {
      id: 1,
      content: "店予約する",
    },
    {
      id: 2,
      content: "卵買う",
    },
    {
      id: 3,
      content: "郵便出す",
    },
  ];

  const [todos, setTodos] = useState(todosList);

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(newTodos);
  };

  const createTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  return (
    <>
      <List todos={todos} deleteTodo={deleteTodo} />
      <Form createTodo={createTodo} />
    </>
  );
};
export default Todo;
```


- `List`コンポーネント：
```Jsx
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

- `Form`コンポーネント：
```jsx
import { useState } from "react";
const Form = ({ createTodo }) => {
  const [enteredTodo, setEnteredTodo] = useState("");

  const addTodo = (e) => {
    e.preventDefault();

    const newTodo = {
      id: Math.floor(Math.random() * 1e5),
      content: enteredTodo,
    };

    createTodo(newTodo);

    setEnteredTodo("");
  };
  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={enteredTodo}
          onChange={(e) => setEnteredTodo(e.target.value)}
        />
        <button>追加</button>
      </form>
    </div>
  );
};

export default Form;
```

