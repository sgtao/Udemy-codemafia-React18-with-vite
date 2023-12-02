[to TopPage](../README.md)

# 03_【スキップ可】Reactで頻出のJavaScriptの記法

## 講座一覧
- [008_セクション紹介](#008_セクション紹介)
- [009_npmコマンドの使い方](#009_npmコマンドの使い方)
- [010_本セクションのコードの実行方法](#010_本セクションのコードの実行方法)
- [011_アロー関数の記法について学ぼう](#011_アロー関数の記法について学ぼう)
- [012_ESModuleのExport／Importについて学ぼう](#012_ESModuleのExport／Importについて学ぼう)
- [013_コールバック関数の挙動について学ぼう](#013_コールバック関数の挙動について学ぼう)
- [014_DOMとイベントリスナについて学ぼう](#014_DOMとイベントリスナについて学ぼう)
- [015_配列のmap、filterメソッドについて学ぼう](#015_配列のmap、filterメソッドについて学ぼう)
- [016_分割代入について学ぼう](#016_分割代入について学ぼう)
- [017_スプレッド演算子と残余引数について学ぼう](#017_スプレッド演算子と残余引数について学ぼう)
- [018_三項演算子について学ぼう](#018_三項演算子について学ぼう)
- [019_truthyな値、falsyな値について学ぼう](#019_truthyな値、falsyな値について学ぼう)
- [020_Promiseについて学ぼう](#020_Promiseについて学ぼう)
- [021_await／asyncの使い方について学ぼう](#021_await／asyncの使い方について学ぼう)


## 008_セクション紹介
[toTop](#)

- Reactで頻出するJavaScriptの記法を紹介（スキップ可）


## 009_npmコマンドの使い方
[toTop](#)

- `npm`の使い方、コマンド実行方法（`npm_cli`）
* 各階層の`package.json`がある場合、`npm install`を実行すると依存パッケージがインストールされる。
  * 省略形　`npm i` でも依存パッケージがインストールできる
  ```
  # npm instal
  npm i # 省略形
  ```

- 個別にパッケージをインストールする場合はパッケージを指定して、`npm i {パッケージ名} `をする
  * -Dを付けるとdevDependenciesという開発環境でのみ使用するパッケージとして依存関係が登録される

- インストールしたパッケージは`npm rm {パッケージ名}`で依存関係からさじょできる


## 010_本セクションのコードの実行方法
[toTop](#)

- 講義のサンプルコードの味方
  * `start`が初期状態、`end`が講義内容の実装後のサンプル
  * 実行方法は各セクションで変化する
    * 『**JavaScriptの記法**』セクションは、VSCodeの`Live Server`を利用
    * 『**04_まずはReactに触れてみよう**』以降は、`npm start`コマンドを利用

## 011_アロー関数の記法について学ぼう
[toTop](#)

- POINT アロー関数の使い方（`arrow_function`）
- 通常定義の関数を省略して記述できる
  * [020_arrow_function](./020_arrow_function/)
```js
function fn(number) {
  return number * 2;
}
console.log(fn(2));
console.log(fn(4));

const fnArrow = number => {
  console.log(number);
  return number * 2;
};
console.log(fnArrow(4));


const fnArrowObj = number => ({ result: number * 2 })

console.log(fnArrowObj(2));
```


## 012_ESModuleのExport／Importについて学ぼう
[toTop](#)

- POINT ESModuleの使い方（`esmodule`）
- 複数のファイルで機能を管理する方法
  * 機能定義を個別のファイルで定義（`export`で外部からの読出しを定義する）
  * 使いたい機能を`import`で外部ファイルから読み込む

### Export側の定義
```js
export const hello = () => {
  console.log("hello!");
};

const funcB = () => {
  console.log("funcB output");
};
// export default とすると、Import側は`{}`を付けない
export default funcB;

class User {
  constructor(name) {
    this.name = name;
  }
  hello() {
    console.log(this.name);
  }
}

export { User }
```

### Importの読出し例
```js
// POINT ESModuleの使い方
// 読みだすファイルは、index.jsから読み出すときは拡張子まで記述
// - Bundleツールで呼び出す場合は、拡張子の省略が可能
import functionB, { hello, User } from "./module.js";
hello();
functionB();
const user = new User('Tom');
user.hello();
```


## 013_コールバック関数の挙動について学ぼう
[toTop](#)

- POINT コールバック関数の使い方（`callback`）
- Callback関数は引数に渡された関数のことを指す
  * 関数の中で関数を読み出せる
```js
// POINT コールバック関数の使い方
function print(fn) {
  const result = fn(2);
  console.log(result);
}

function fn(number = 3) {
  return number * 2;
}

// JavaScript内で`debugger`はブレークポイントを示す
// - プログラムが一時停止する
// debugger; // ここで一時停止するのでコメントアウト

print(fn);
```


## 014_DOMとイベントリスナについて学ぼう
[toTop](#)

- POINT DOMとイベントリスナ（`DOM and eventlistener`）
- DOMとはHTMLの１つ１つのタグをJavaScriptから操作するときの要素

### DOMの取得方法
```js
const h1Element = document.querySelector('h1');
console.log(h1Element);
// <h1>終了時点コード</h1> // HTMLの内容が見える


// DOM要素の実態：
console.dir(h1Element);
// h1  // オブジェクトとして扱われている
//   accessKey: ""
//   align: ""
//   ariaAtomic: null
//   ...
```

### イベントリスナー
```js
// POINT DOMとイベントリスナ
const btnEl = document.querySelector('button');
const helloFn = (e) => {
  console.dir(e.target);
  // buttonオブジェクト
  //
  console.dir(e.target.textContent);
  // クリック
  console.log('hello')
};

// イベントリスナ
// 第二引数にcallback関数を指定する（直接Arrow記述もできる）
btnEl.addEventListener('click', helloFn)
```


## 015_配列のmap、filterメソッドについて学ぼう
[toTop](#)

- POINT 配列のmap、filterメソッドの使い方（`array_method`）
- 配列の各要素に作用するメソッドの使い方を学ぶ
  * いきなり使いだすと難しい、なので最初はFor文から学んでみる

### 配列要素の定義
```js
// POINT 配列のmap、filterメソッドの使い方
const arry = [10, 20, 30, 40];
const newArry = [];
```
### For文の記載方法
- ロジックは、後続の説明(`map`と`filter`を説明するために２つの処理に分けてる)
```js
for(let i = 0; i < arry.length; i++) {
  const val = arry[i] * 2;
  if(val > 50) {
    newArry.push(arry[i] * 2)
  }
}
console.log(newArry);
// 配列オブジェクトが表示される
// (2) [60, 80]
// Array(2)
//   0: 60
//   1: 80
//   length: 2
//   [[Prototype]]: Array(0)
```

### mapとfilterによる実装例
- `map`メソッド：配列要素を引数にしたCallback関数を定義して、各要素ごとに演算する
- `filter`メソッド：配列要素を引数にしたCallback関数を定義して、返り値がTrueになるもののみを抽出する
- 効果：チェインでつなげていくこともできて、実装行が少なくなる
```js
const newArry2 = arry.map(val => val * 2).filter(val => val > 50);
console.log(newArry2)
// (2) [60, 80]
```

#### 分解して記述した場合
```js
const newArry2 = arry.map(val => val * 2);
console.log(newArry2)
// (4) [20, 40, 60, 80]

const newArry3 = newArry2.filter(val => val > 50);
console.log(newArry3)
// (2) [60, 80]
```



## 016_分割代入について学ぼう
[toTop](#)

- POINT 分割代入の使い方（`destructuring`）
- 分割代入とは、配列やオブジェクトの特定の要素を変数として抽出する方法

### 配列の分割代入
- 配列の分割代入では、順序（位置）で代入元が決まる
```js
const [ a, , c ] = ["配列1", "配列2", "配列3"];
console.log(a);
// 配列1
console.log(c);
// 配列3
// console.log(arry[2]); // `arry`は定義していないので、"配列2"は参照できなくなる
```

### オブジェクトの分割代入
- オブジェクトの分割代入では、元オブジェクトのプロパティ名で分割される
```js
const { z, x } = { x: "オブジェクト1", y: "オブジェクト2", z: "オブジェクト3" };
console.log(x);
// オブジェクト1
console.log(z);
// オブジェクト3
```

### 関数の引数で分割代入を使う例
* 配列の分割代入
```js
const arr = ["Japan", "Tokyo", "Shinjuku"];
const fnArr = ([ country,  , city ]) => {
  console.log("---配列---");
  console.log(`country: ${country}`);
  // console.log(`state: ${state}`); // 参照できない
  console.log(`city: ${city}`);
};
fnArr(arr);
// ---配列---
// main.js:17 country: Japan
// main.js:19 city: Shinjuku
```

* オブジェクトの分割代入
```js
const objAddress = { country: "Japan", state: "Tokyo", city: "Shinjuku" };
const fnObj = ({ country, state }) => {
  console.log("---オブジェクト---");
  console.log(`country: ${country}`);
  console.log(`state: ${state}`);
  // console.log(`city: ${city}`);
};
fnObj(objAddress);
// ---オブジェクト---
// main.js:25 country: Japan
// main.js:26 state: Tokyo
```


## 017_スプレッド演算子と残余引数について学ぼう
[toTop](#)

- POINT スプレッド演算子の使い方（`spread_rest`）
- スプレッド演算子は、配列・オブジェクトの要素を展開して処理する演算子

### 配列での使用例
```js
const nums = [3, 1, 4, 1, 5, 10, 2, 6];

const result0 = Math.max(nums);
console.log(result0);
// Nan

// Nanの理由は、`Math.max`は可変長引数なので、展開した値を渡す必要がある
const result1 = Math.max(3, 1, 4, 1, 5, 10, 2, 6);
console.log(result1);

// スプレッド演算子を使うと、配列を展開してくれる
const result = Math.max(...nums);
console.log(...nums);
// 3 1 4 1 5 10 2 6
console.log(result);
// 10
```

### 配列結合での利用例
```js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let newArr = [...arr1, 10, ...arr2 ];
let newArr1 = arr1;
console.log(newArr);
// (7) [1, 2, 3, 10, 4, 5, 6]
```

### オブジェクトにおけるスプレッド演算子
```js
const obj = {
  name: "Tom",
  age: 22,
};
console.log(obj);
// {name: 'Tom', age: 22}

const newObj = { ...obj };
newObj.name = 'John';
console.log(newObj);
// {name: 'John', age: 22}
```

### 関数におけるスプレッド演算子
- 可変長関数として利用できる
```js
const restA = (...argA) => console.log(argA);
restA(1, 3);
// (2) [1, 3] // 配列として扱われる

const restB = (n, ...argB) => console.log(n, argB);
restB(1, 3, 4);
// 1 (2) [3, 4] // 1 と [3, 4]
// 通常の引数は位置で判定される
```


## 018_三項演算子について学ぼう
[toTop](#)

- POINT 三項演算子（ ? : ）の使い方（`conditional_operator`）
  * 演算子の条件文は truthy / falsy で判定される
```js
const a = 0;
let resultA = a ? 10 : -10;
// 下のif-else文と同じ意味となる
// if(a) {
//   resultA = 10;
// } else {
//   resultA = -10;;
// }

console.log(resultA);
// -10
```

### 関数のReturnデモ利用できる（例）
```js
const a = 0;
function getResult(flag) {
  return flag ? "true" : "false";
}

console.log(getResult(a < 10));
// true
```



## 019_truthyな値、falsyな値について学ぼう
[toTop](#)

- POINT truthyとfalsyについて（`truthy and falsy`）
  - falsy → 真偽値に変換した際に"偽(false)"とみなされる値のこと。
  - truthy → **falsy以外**

```js
/* POINT falsyな値"偽(false)"の一覧
false
0 (数字)
0n (big int)
"" (空文字)
null
undefined
NaN (Not a Number)
*/
```

### 利用例
```js
const a = 0;
let result = a ? 10 : -10;
console.log(result);
// -10

const falsy = 0;
const truthy = 1;
console.log(Boolean(truthy));  // Boolean()関数を使うとtruthyかfalsyかを判定できる
// true
console.log(Boolean(falsy));
// false
```

### 論理演算をした結果
#### 論理積 (`&&`) について
- 値の一部に`falsy`な値があると、その値がセットされる
  * `falsy`の値がないと、もっとも右側の値がセットされる
```js
const resultA = "" && "foo";
console.log(resultA);
//    // 空白(null)になる

const resultB = 2 && 1 && 0 && 3;
console.log(resultB);
// 0

const resultC = "foo" && 4;
console.log(resultC);
// 4
```

#### 理論和 (`||`) について
- 値の一部でも`truthy`な値があると、その値がセットされる
  * `truthy`の値のなかで、もっとも左側の値がセットされる
```js
const resultD = "" || "foo";
console.log(resultD);
// foo

const resultE = 0 || 2 || 0;
console.log(resultE);
// 2

const resultF = "foo" || 4;
console.log(resultF);
// foo
```


## 020_Promiseについて学ぼう
[toTop](#)

- POINT 非同期処理（`Promise`）

### 同期処理と非同期処理
```js
// 同期処理
let a = 0;
console.log(a);
// 0

// 非同期処理
setTimeout(() => {
  a = 1;
}, 2000);
console.log(a);
// 0 // `a = 1`は遅延して実行されるので、代入値が反映されない
```

### 非同期処理の同期化方法（Promiss）
- `Promiss`というオブジェクトを使えば、`then`でつなげると同期処理される
```js
new Promise((resolve, reject) => {
    setTimeout(() => {
        a = 1;
        resolve(a)
    }, 2000);
}).then((b) => { // resolveの値が日t奇数となる
    console.log(b);
    // 1
    b = 3;
    return b;
}).then((b) => {
    console.log(b);
    // 3
}).catch((c) => { // 例外時の処理
    console.log('catchが実行', c)
})

```


## 021_await／asyncの使い方について学ぼう
[toTop](#)

- POINT 非同期処理（`await/async`）
  * `Promiss`の処理を読みやすくした記述法
  * 前の節を書き換えた例
```js
let a = 0;

init();
async function init() {
    try {
        const result = await new Promise((resolve, reject) => {
            setTimeout(() => {
                a = 1;
                reject(a); // 意図的に例外処理を発生させる（ココで catch文へ移動する）
            }, 2000);
        })
        a = 100; // ここは実行されない
        console.log(result); // ここは実行されない
    } catch(e) {
        console.log('catchが実行', e)
        // catchが実行 1
    }
}
```

