[to TopPage](../README.md)

# 06_制御構文とフォームの制御

## 講座一覧
- [058_セクション紹介](#058_セクション紹介)
- [059_配列をリスト表示](#059_配列をリスト表示)
- [060_【重要】リストには必ずキーを設定](#060_重要リストには必ずキーを設定)
- [061_【練習】リストにキーを設定してみよう](#061_練習リストにキーを設定してみよう)
- [062_配列のフィルターメソッドの使い方](#062_配列のフィルターメソッドの使い方)
- [063_【練習】フィルターメソッドの使い方を練習してみよう](#063_練習フィルターメソッドの使い方を練習してみよう)
- [064_条件分岐を設ける方法まとめ](#064_条件分岐を設ける方法まとめ)
- [065_コンポーネントのリファクタリング](#065_コンポーネントのリファクタリング)
- [066_【Form】inputとtextareaの作成方法](#066_forminputとtextareaの作成方法)
- [067_【Form】ラジオボタンの作成方法](#067_formラジオボタンの作成方法)
- [068_【Form】チェックボックスの作成方法](#068_formチェックボックスの作成方法)
- [069_【Form】複数選択チェックボックスの作成方法](#069_form複数選択チェックボックスの作成方法)
- [070_【Form】プルダウンの作成方法](#070_formプルダウンの作成方法)
- [071_Todoアプリを作ってみよう](#071_todoアプリを作ってみよう)


## 058_セクション紹介
[toTop](#)
- このセクションでは、制御構文とReactを組み合わせて使うときの注意点を紹介

## 059_配列をリスト表示
[toTop](#)
- リスト表示する元データ（配列）は、for文でJSXの配列を作成
```jsx
  const animalList = [];
  for (const animal of animals) {
    animalList.push(<li>{animal}</li>);
  }
```

### ソースコード
- [end source](./src/010_list_components/end/Example.jsx)
- エントリーコンポーネント：
```jsx

const animals = ["Dog", "Cat", "Rat"];

const Example = () => {
  // POINT for文でJSXの配列を作成
  const animalList = [];
  for (const animal of animals) {
    animalList.push(<li>{animal}</li>);
  }

  // POINT map関数でJSXの配列を作成
  const helloAnimals = animals.map((animal) => {
    return <li>Hello {animal}</li>;
  });

  return (
    <>
      <h3>配列の操作</h3>
      <ul>
        {/* <li>{animals[0]}</li>
        <li>{animals[1]}</li>
        <li>{animals[2]}</li> */}
        {/* {animalList}
        {helloAnimals} */}
        {/* POINT map関数はJSX内に記述可能 */}
        {animals.map((animal) => <li>Hello, {animal}</li>)}
      </ul>
    </>
  );
};

export default Example;
```

## 060_【重要】リストには必ずキーを設定
[toTop](#)

### なぜキーを付ける必要があるか？

- 前提知識：
  * React は React 要素ツリ ー (厳密には Fiber ツリ ー )の差分検出処理をして DOM を更新している
  * 差分を検出した要素配下を再レンダリングする
- キーなしの場合：
  * 全要素を再レンダリングする
- キーありの場合：
  * 更新したキーのある要素のみを再レンダリングする

 前提知識 | キーありの場合
 -- | --
 React は要素ツリーの差分検出してDOM更新 | キーのある要素が差分検出を助ける
 ![image](./images/0601_ReactUpdateByDifferencialTree.png) | ![image](./images/0602_KeyHelpReactRecognition.png)

### key を付ける際の注意点：
- キーには必ず一意の値を設定する。
- キーに設定した値は変更しない。
- 配列のインデックスはなるべく使わない。⇒画面で確認する

### コード
- [end source](./src/024_why_key_unique/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import "./Example.css";
import { useState } from "react";

const Example = () => {
  const inputFact = () => ({
    key: Math.floor(Math.random() * 1e3),
    value: <input />,
  });

  const [inputs, setInputs] = useState([inputFact(), inputFact(), inputFact()]);

  const unshiftInput = () => {
    setInputs((prev) => [inputFact(), ...prev]);
  };
  return (
    <>
      <button onClick={unshiftInput}>先頭に追加</button>
      <div className="flex">
        <div>
          <strong>{`key={ユニークキー}`}</strong>
          <ul>
            {inputs.map((input) => (
              <li key={input.key}>
                {input.key}: {input.value}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong>{`key={index}`}</strong>
          <ul>
            {inputs.map((input, index) => (
              <li key={index}>
                {input.key}: {input.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Example;
```

## 061_【練習】リストにキーを設定してみよう
[toTop](#)

### 練習問題
- キーを設定したリスト表示を自分で書いて見てください。
```jsx
const Example = () => {
  return (
    <>
      <h3>練習問題</h3>
      <p>Profileコンポーネントを使用して、完成コードと同じ画面を作成してください。</p>
      <p>また、Profileコンポーネント内のリスト表示部分のkeyを設定して、ワーニング表示がされないようにしてください。</p>
      <ul>
        {/* ここに記述 */}
      </ul>
    </>
  );
};
 
export default Example; 
```

#### 例）`Profile`コンポーネント：
```jsx
const Profile = ({ name, age, hobbies }) => {
  return (
    <div>
      <hr />
      <div>Name: {name}</div>
      <div>Age: {age}</div>
      <div>
        <div>Hobby:</div>
        <ul>
          {hobbies.map((hobby) => (
            /* リストにはkeyを設定することを忘れないように！ */
            <li key={hobby}>{hobby}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
```

#### 試行案：
```jsx
import Profile from './components/Profile';
// persons define
const persons = [
  {
    name: "Geo",
    age: 18,
    hobbies: ["sports", "music"],
  },
  ...
];

const Example = () => {
  return (
    <>
      <h3>練習問題</h3>
      <p>Profileコンポーネントを使用して、完成コードと同じ画面を作成してください。</p>
      <p>また、Profileコンポーネント内のリスト表示部分のkeyを設定して、ワーニング表示がされないようにしてください。</p>
      <ul>
        {/* ここに記述 */
          persons.map((person) => {
            <li key={person.name}>
              <Person
                name={person.name}
                age={person.age}
                hobbies={person.hobbies}
              />
            </li>
          })
        }
      </ul>
    </>
  );
}

export default Example;
```

### 回答
- [end source](./src/030_practice_list/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import Profile from "./components/Profile";

const persons = [
  {
    name: "Geo",
    age: 18,
    hobbies: ["sports", "music"],
  },
  {
    name: "Tom",
    age: 25,
    hobbies: ["movie", "music"],
  },
  {
    name: "Lisa",
    age: 21,
    hobbies: ["sports", "travel", "game"],
  },
];

const Example = () => {
  return (
    <>
      <ul>
        {/* mapで各要素に特定の処理を行ったものを新しい配列とする */}
        {persons.map((person) => (
            /* リストにはkeyを設定することを忘れないように！ */
            <li key={person.name}>
            <Profile {...person} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Example;
```

- `Profile`コンポーネント：
```jsx
const Profile = ({ name, age, hobbies }) => {
  return (
    <div>
      <hr />
      <div>Name: {name}</div>
      <div>Age: {age}</div>
      <div>
        <div>Hobby:</div>
        <ul>
          {hobbies.map((hobby) => (
            /* リストにはkeyを設定することを忘れないように！ */
            <li key={hobby}>{hobby}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
```


## 062_配列のフィルターメソッドの使い方
[toTop](#)

### `filter`メソッド
- 参考セクション：[015_配列のmap、filterメソッドについて学ぼう](../03_js_basic/README.md#015_配列のmapfilterメソッドについて学ぼう)

```jsx
// 初期配列
const arry = [10, 20, 30, 40];
// mapで繰り返し処理
const newArry2 = arry.map(val => val * 2);
console.log(newArry2)
// (4) [20, 40, 60, 80]

// filterで絞り込み
// return値がTrueのものだけ抽出
// const newArry3 = newArry2.filter((val) => {
//   const is50Over = (val > 50);
//   return is50Over;
// });
// 上と同義の記述
const newArry3 = newArry2.filter(val => val > 50);

console.log(newArry3)
// (2) [60, 80]

// map と filter で連続して演算
const newArray.map(val => val * 2).filter(val => val > 50);
console.log(newArry)
// (2) [60, 80]
```

### `filter`＋`map`メソッドで、キーワードで絞り込んで一覧で示す
```jsx
const Example = () => {
  const animals = ["Dog", "Cat", "Rat"];
  const filterVal = "Do";
  const filterdAnimals = animals.filter((animal) => {
    const isMatch = animal.indexOf(filterVal) !== -1; // 不一致(-1)以外
    return isMatch;
  })
  return (
    <ul>
      {
        filterdAnimals.map(animal => {
          <li key={animal}>{animal}</li>
        });
      }
    </ul>
  );
}

```


### ソースコード
- [end source](./src/040_list_and_filter/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

const animals = ["Dog", "Cat", "Rat"];
// POINT filterメソッドの使い方
const Example = () => {
  const [filterVal, setFilterVal] = useState("");
  return (
    <>
      <h3>配列のフィルター</h3>
      <input type="text" value={filterVal} onChange={(e) => setFilterVal(e.target.value)} />
      <ul>
        {animals
          .filter(animal => {
            const isMatch = animal.indexOf(filterVal) !== -1;
            console.log(animal.indexOf(filterVal))
            return isMatch
          })
          .map((animal) => (
          <li key={animal}>{animal}</li>
        ))}
      </ul>
    </>
  );
};

export default Example;
```

## 063_【練習】フィルターメソッドの使い方を練習してみよう
[toTop](#)

### 問題：
- 入力欄を設置して、入力値と名前が一致したもののみ表示する仕組みを作成してください。
- 初期コード：
```jsx
import Profile from "./components/Profile";

const persons = [
  {
    name: "Geo",
    age: 18,
    hobbies: ["sports", "music"],
  },
  {
    name: "Tom",
    age: 25,
    hobbies: ["movie", "music"],
  },
  {
    name: "Lisa",
    age: 21,
    hobbies: ["sports", "travel", "game"],
  },
];

const Example = () => {
  return (
    <>
      <ul>
        {/* mapで各要素に特定の処理を行ったものを新しい配列とする */}
        {persons.map((person) => (
            /* リストにはkeyを設定することを忘れないように！ */
            <li key={person.name}>
            <Profile {...person} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Example;
```

### 試行案：
- `Example`コンポーネントの変更
```jsx
import {useState} from react;
... // 初期配列設定など

const Example = () => {
  const [filterVal, setFilterVal] = useState("");
  const changeFilter = (e) => {
    setFilterVal(e.target.value);
  }
  return (
    <>
      <input type="text" value={filterVal} onChange={changeFilter} />
      <ul>
        {/* filter + mapで絞り込んだ配列を一覧表示 */}
        {persons.filter(person => {
            return (person.indexOf(filterval) !== -1);
          }).map((person) => (
            /* リストにはkeyを設定することを忘れないように！ */
            <li key={person.name}>
              <Profile {...person} />
            </li>
          ))
        }
      </ul>
    </input>
  );
};
```

### 回答：
- [end source](./src/050_practice_filter/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import Profile from "./components/Profile";
import { useState } from "react";

const persons = [
  {
    name: "Geo",
    age: 18,
    hobbies: ["sports", "music"],
  },
  {
    name: "Tom",
    age: 25,
    hobbies: ["movie", "music"],
  },
  {
    name: "Lisa",
    age: 21,
    hobbies: ["sports", "travel", "game"],
  },
];

const Example = () => {
  const [filterVal, setFilterVal] = useState("");
  return (
    <>
      <input type="text" value={filterVal} onChange={(e) => setFilterVal(e.target.value)} />
      <ul>
        {persons
        // filterを追加
        .filter(person => {
          const isMatch = person.name.indexOf(filterVal) !== -1;
          return isMatch
        })
        .map((person) => (
          <li key={person.name}>
            <Profile {...person} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Example;
```

- `Profile`コンポーネント：
```jsx
const Profile = ({ name, age, hobbies }) => {
  return (
    <div>
      <hr />
      <div>Name: {name}</div>
      <div>Age: {age}</div>
      <div>
        <div>Hobby:</div>
        <ul>
          {hobbies.map((hobby) => (
            <li key={hobby}>{hobby}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
```


## 064_条件分岐を設ける方法まとめ
[toTop](#)

- if文、三項演算子、そのほか、(特定の条件の場合は)&&演算子やnull合体演算子 の実装方法がある
  * おすすめは三項演算子（コードの修正が発生した場合の変更量が減るため）
### `if`文
```jsx
if(animal === "Dog") {
  return <li key={animal}>{animal}★</li>
} else {
  return <li key={animal}>{animal}</li>
}
```
### 3項演算子
- 上記コードと同義。重複部分をまとめられる
```jsx
<li key={animal}>{
  animal + (animal === "Dog"
    ? "★"
    : "")
}</li>
```
### `&&`：AND条件
- 上記コードと同義。
  * 後半`(animal === "Dog" && "★")`が、条件がTrueの時のみ`"★"`を表示
```jsx
<li key={animal}>{
  animal + (animal === "Dog" && "★")
}
{
  // Reactでは下の記述で分離させることもある
  // {animal}
  // {(animal === "Dog" && "★")}
}
</li>
```

### `??`：null合体演算子
- `null`型演算子は、`null`もしくは`undefined`かどうかを判定する
```jsx
// A ?? B
// 変数Aがnullかundefinedのとき、Bとなる
const animalStr = animal ?? "null,undefinedでした";
```

### ソースコード
- [end source](./src/060_conditional_render/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

/* POINT 条件分岐 if文、&&、??（Null合体演算子）、３項演算子
  A ?? B (Aがnull or undefinedの時、Bを使う)
*/
const Example = () => {
  const animals = ["Dog", "Cat", null, "Rat"];

  const [filterVal, setFilterVal] = useState("");

  return (
    <>
      <input
        type="text"
        value={filterVal}
        onChange={(e) => setFilterVal(e.target.value)}
      />
      <ul>
        {animals
          .filter((animal) => {
            const animalStr = animal ?? "";
            const isMatch = animalStr.indexOf(filterVal) !== -1;

            return isMatch;
          })
          .map((animal) => {
            return (
              <li key={animal}>
                {
                  // POINT if文
                  // if(animal === "Dog") {
                  //   return <li key={animal}>{animal}★</li>
                  // } else {
                  //   return <li key={animal}>{animal}</li>
                  // }
                  // POINT 3項演算子
                  // animal + (animal === "Dog"
                  //  ? "★"
                  //  : "")
                  // POINT null合体演算子
                  animal ?? "null,undefinedでした"
                }
                {/* POINT &&演算子 */}
                {animal === "Dog" && "★"}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Example;
```

## 065_コンポーネントのリファクタリング
[toTop](#)

- コンポーネント毎にファイル分割する
### ソースコード
- [end source](./src/070_refactor_components/end/Example.jsx)
- エントリーコンポーネント：
```jsx
// POINT コンポーネントのリファクタリング

import { useState } from "react";

import AnimalList from "./components/AnimalList"
import AnimalFilter from "./components/AnimalFilter"

const Example = () => {
  const animals = ["Dog", "Cat", "Rat"];

  const [filterVal, setFilterVal] = useState("");

  const filterdAnimals = animals.filter((animal) => {
    const isMatch = animal.indexOf(filterVal) !== -1;
    return isMatch;
  });

  return (
    <>
      <AnimalFilter filterState={[filterVal, setFilterVal]}/>
      <AnimalList animals={filterdAnimals} />
    </>
  );
};

export default Example;
```

- `AnimalFilter`コンポーネント：
```jsx
const AnimalFilter = ({ filterState }) => {
  const [filterVal, setFilterVal] = filterState;

  return (
    <input
      type="text"
      value={filterVal}
      onChange={(e) => setFilterVal(e.target.value)}
    />
  );
};
export default AnimalFilter;
```

- `AnimalList`コンポーネント：
```jsx
import AnimalItem from "./AnimalItem";
const AnimalList = ({ animals }) => {
  if (animals.length === 0) {
    return <h3>アニマルが見つかりません。</h3>;
  }

  return (
    <ul>
      {animals.map((animal) => {
        return <AnimalItem animal={animal} key={animal} />;
      })}
    </ul>
  );
};

export default AnimalList;
```

## 066_【Form】inputとtextareaの作成方法
[toTop](#)

- [end source](./src/080_input_textarea/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

// POINT input要素、textarea要素の使い方
const Example = () => {

  const [val, setVal] = useState("");
  const clearVal = () => setVal("");

  return (
    <div>
      <label htmlFor="456">ラベル</label>
      <div>
        <input
          id="123"
          placeholder="こんにちは"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <textarea
          id="456"
          placeholder="こんにちは"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
      </div>
      <h3>{val}</h3>
      <button onClick={clearVal}>クリア</button>
    </div>
  );
};

export default Example;
```


## 067_【Form】ラジオボタンの作成方法
[toTop](#)

- [end source](./src/090_radio/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

// POINT ラジオボタンの実装
const Example = () => {
  const [fruit, setFruit] = useState("Apple");
  const onChange = (e) => setFruit(e.target.value);

  const RADIO_COLLECTION = ["Apple", "Banana", "Cherry"];

  return (
    <>
      {RADIO_COLLECTION.map((value) => {
        return (
          <label key={value}>
            <input
              type="radio"
              value={value}
              checked={fruit === value}
              onChange={onChange}
            />
            {value}
          </label>
        );
      })}
      {/* <label>
        <input
          type="radio"
          value="Banana"
          checked={fruit === "Banana"}
          onChange={onChange}
        />
        Banana
      </label>
      <label>
        <input
          type="radio"
          value="Cherry"
          checked={fruit === "Cherry"}
          onChange={onChange}
        />
        Cherry
      </label> */}
      <h3>私は{fruit}がたべたい</h3>
    </>
  );
};

export default Example;

```

## 068_【Form】チェックボックスの作成方法
[toTop](#)

- [end source](./src/100_single_checkbox/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

// POINT チェックボックスの実装
const Example = () => {
  const [isChecked, setIsChecked] = useState(true);

  // const toggleChecked = (e) => {
  //   setIsChecked(prevState => !prevState);
  // };

  return (
    <div>
      <label htmlFor="my-check">
        チェック：
      </label>
      <input
        type="checkbox"
        id="my-check"
        checked={isChecked}
        onChange={() => setIsChecked(prevState => !prevState)}
      />
      <div>{isChecked ? "ON!" : "OFF!"}</div>
    </div>
  );
};

export default Example;
```


## 069_【Form】複数選択チェックボックスの作成方法
[toTop](#)

- 複数のチェックボックスを評価したい場合、filter関数でチェックボックス全体を評価する
  * forEach バージョン
  * filter + forEach バージョン
  * filter + reduce バージョン
### `reduce`メソッド
* 配列のそれぞれの要素に対して、「縮小」コールバック関数を呼び出し、直前の要素における計算結果の返値を渡しながら計算する。
  * 構文：
  ```jsx
  reduce(callbackFn)
  reduce(callbackFn, initialValue)
  // callbackFn( 前の要素の演算結果、現要素の値 )
  ```
* 簡単な例は配列の合計を計算する（参考：MDN『[Array.prototype.reduce()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)』）
```jsx
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);

console.log(sumWithInitial);
// Expected output: 10
```

### ソースコード
- [end source](./src/110_multi_checkbox/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

// POINT 複数チェックボックスの実装
const Example = () => {
  const [fruits, setFruits] = useState([
    { label: "Apple", value: 100, checked: false },
    { label: "Banana", value: 200, checked: false },
    { label: "Cherry", value: 300, checked: false },
  ]);

  const [sum, setSum] = useState(0);

  const handleChange = (e) => {
    const newFruits = fruits.map((fruit) => {
      const newFruit = { ...fruit };
      if (newFruit.label === e.target.value) {
        newFruit.checked = !fruit.checked;
      }

      return newFruit;
    });

    setFruits(newFruits);
    // forEachバージョン
    // let sumVal = 0;
    // newFruits.forEach(fruit => {
    //   if(fruit.checked) {
    //     sumVal = sumVal + fruit.value;
    //   }
    // });

    // filter + forEachバージョン
    // let sumVal = 0;
    // newFruits
    //   .filter((fruit) => fruit.checked)
    //   .forEach((fruit) => (sumVal = sumVal + fruit.value));

    // filter + reduceバージョン
    let sumVal = newFruits
      .filter((fruit) => fruit.checked)
      .reduce((sumVal, fruit) => sumVal + fruit.value, 0);
    setSum(sumVal);
  };
  return (
    <div>
      {fruits.map((fruit) => {
        return (
          <div key={fruit.label}>
            <input
              id={fruit.label}
              type="checkbox"
              value={fruit.label}
              checked={fruit.checked}
              onChange={handleChange}
            />
            <label htmlFor={fruit.label}>
              {fruit.label}:{fruit.value}
            </label>
          </div>
        );
      })}
      <div>合計：{sum}</div>
    </div>
  );
};

export default Example;
```

## 070_【Form】プルダウンの作成方法
[toTop](#)

### ソースコード
- [end source](./src/120_select/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";

// POINT プルダウンの実装
const Example = () => {
  const [selected, setSelected] = useState("Banana");

  const OPTIONS = ["Apple", "Banana", "Cherry"];

  return (
    <>
      <select
        {/* Reactではvalue属性に初期状態の値を指定する。HTMLではoption要素に`selected`を付けるけど、異なる*/}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        {/* <option value="Apple">Apple</option>
        <option value="Banana">Banana</option>
        <option value="Cherry">Cherry</option> */}
      </select>
      <div>選択された果物：{selected}</div>
    </>
  );
};

export default Example;
```

## 071_Todoアプリを作ってみよう
[toTop](#)

- `Form`コンポーネントで、submitすると画面リロードが実行されて入力内容が消えてしまう
  * `form`要素は（ブラウザのディフォルト機能により）、`action`属性に指定したURLにリクエストを送って、そのページに遷移する機能がある
  * このブラウザの機能を`e.preventDefault()`で止めてリロード抑止すると入力内容が残る
* `Form`コンポーネント内の`id`付与時、ランダムな４桁番号を降っている
  * 例）`const id = Math.floor(Math.random() * 1e5);`
  * ID生成は、[パッケージNanoid](https://github.com/ai/nanoid#readme) の利用でもよい
  * サンプルコード：
  ```jsx
  import { nanoid } from 'nanoid'
  model.id = nanoid() //=> "V1StGXR8_Z5jdHi6B-myT"
  ```

### ソースコード
- [end source](./src/130_reminder/end/Example.jsx)
- エントリーコンポーネント：
```jsx
// POINT Reminder(Todoアプリ)の作り方
import Todo from "./components/Todo"

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
import { useState } from "react"
import List from "./List"
import Form from "./Form"

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

  const [ todos, setTodos ] = useState(todosList);

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(newTodos);
  }

  const createTodo = (todo) => {
    setTodos([...todos, todo]);
  }

  return (
    <>
      <List todos={todos} deleteTodo={deleteTodo}/>
      <Form createTodo={createTodo}/>
    </>
  )
};
export default Todo;
```

- `List`コンポーネント：
```jsx
const List = ({todos, deleteTodo}) => {
    const complete = (id) => {
        deleteTodo(id)
    }
    return (
        <div>
            {todos.map(todo => {
                return (
                    <div key={todo.id}>
                        <button onClick={() => complete(todo.id)}>完了</button>
                        <span>{todo.content}</span>
                    </div>
                )
            })}
        </div>
    );
}

export default List;
```

- `Form`コンポーネント：
```jsx
import { useState } from "react";
const Form = ({ createTodo }) => {
  const [enteredTodo, setEnteredTodo] = useState("");

  const addTodo = (e) => {
    // Form要素のaction(Enterキー)によるブラウザのリロードを抑止する
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
