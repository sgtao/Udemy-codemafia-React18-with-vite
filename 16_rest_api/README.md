[to TopPage](../README.md)

# 16_RestAPIを使ったサーバーとの通信

## 講座一覧
- [169_セクション紹介](#169_セクション紹介)
- [170_REST−APIとは？](#170_REST−APIとは？)
- [171_JSONとは？](#171_JSONとは？)
- [172_JSON−ServerでモックアップAPIを作成](#172_JSON−ServerでモックアップAPIを作成)
- [173_Axiosを使ってサーバーからデータを取得しよう](#173_Axiosを使ってサーバーからデータを取得しよう)
- [174_取得したデータを画面に反映してみよう](#174_取得したデータを画面に反映してみよう)
- [175_GUIでリクエストの状態を確認しよう](#175_GUIでリクエストの状態を確認しよう)
- [176_更新リクエストをサーバーに送信してみよう](#176_更新リクエストをサーバーに送信してみよう)
- [177_リクエストと画面処理を統合しよう](#177_リクエストと画面処理を統合しよう)
- [178_【発展】ダイナミックインポートとは？](#178_【発展】ダイナミックインポートとは？)
- [179_【発展】コンポーネントのダイナミックインポート](#179_【発展】コンポーネントのダイナミックインポート)


## 169_セクション紹介
[toTop](#)


## 170_REST−APIとは？
[toTop](#)


## 171_JSONとは？
[toTop](#)


## 172_JSON−ServerでモックアップAPIを作成
[toTop](#)

### APIサーバの準備はJSONファイルを準備する
- `json-server`でJSONファイルを読み込むと内容に応じたレスポンスを返す
```json
// cat ./db/db.json
{
  "todo": [
    {
      "id": "5d87d115-7ebb-4d17-adce-4ffe4b39f8c5", // idで参照できる
      "content": "掃除",
      "editing": true,
      "completed": false
    },
    ...
  ],
  "user": [
    {
      "id": 1,
      "username": "hoge太郎",
      "age": 20,
      "hobbies": [
        "サッカー",
        "野球"
      ],
      "premiumAccount": true
    },
    ...
  ]
}
```

### JSONサーバ起動方法
```sh
npx json-server -w ./db/db.json -p 3003
```



## 173_Axiosを使ってサーバーからデータを取得しよう
[toTop](#)

### Axiosのインストール
```sh
npm i axios -S
```

### Aixosを使ったGETメソッド

- サンプルコード：[040_axios_get_request](./src/040_axios_get_request/end/Example.js)
  * `import axios from "axios";`で読み込み
  * `useEffect()`内で`axios.get(<URI>)`を利用
    * 非同期処理を`async`-`await`で同期化
    * ただし、`async`は`useEffect()`内にもう一つ関数を作って指定する
      + `useEffect(async() => {...})`と書くとエラーするため


```jsx
// POINT axiosでGetリクエスト
// https://axios-http.com/

import { useEffect } from "react";
import axios from "axios";

// axiosでリクエストを送信
const Example = () => {
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get('http://localhost:3003/user')

      // 取得したレスポンスはJSONデータをObjectに変換されてるので、そのまま利用できる
      console.log(res.data)
      // 
    }
    // `getUser`のreturnで返す場合、Promiseで記述する
    // const getUser = () => {
    //     axios.get('http://localhost:3003/user').
    //         then((res) => {
    //             return res;
    //         })
    // }
    getUser(); // ここで実行される
  })
};

export default Example;
```

### 実行確認

- 実行は、ChromeDevToolsの**ネットワークタブ**で確認できる
  * フィルタ機能で、`Fetch/XHR`のみにするとAPIリクエストがフィルタリングされて表示される


## 174_取得したデータを画面に反映してみよう
[toTop](#)


- サンプルコード：[050_axios_get_state](./src/050_axios_get_state/end/)
```jsx
// POINT サーバーから取得したデータを画面表示
import { useEffect, useState } from "react";
import axios from "axios";

const Example = () => {
  const [ users, setUsers ] = useState()
  // const [ users, setUsers ] = useState([]); // 応答形式が分かってたら空配列`[]`のセットでもよい
  // サンプルコードは、オプショナルチェイン演算子（`users?`）で回避してる

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get('http://localhost:3003/user')
      // console.log(res.data);
      // [{id: 1, username: "hoge太郎", age: 20, hobbies: ["サッカー", "野球"], premiumAccount: true},…]

      // 取得後に画面更新するため、`setUsers()`で更新
      setUsers(res.data);
    }
    getUser();
  }, []); // 

  return (
    <div>
      {/* `users?.`はオプショナルチェイン演算子という、初期値がからでもmap演算子をエラーにしない書き方*/}
      {users?.map(user => {
        return (
          <div key={user.id}>
            <h3>{user.username}</h3>
            <p>age: {user.age}</p>
            <p>hobby: {user.hobbies.join(',')}</p>
          </div>
        )
      })}
    </div>
  )
};
export default Example;
```


## 175_GUIでリクエストの状態を確認しよう
[toTop](#)

- Restful APIのクライアントツールを使ってjson-serverにPOSTメソッド、GETメソッドでアクセスしてみる


## 176_更新リクエストをサーバーに送信してみよう
[toTop](#)

- APIアクセス部分のみをJavaScriptで実装する
- サンプルコード：[050_axios_get_stateend/api/todo.js](./src/060_other_method/end/api/todo.js)
```jsx
// POINT axiosを用いたAPI
import axios from 'axios';

const ENDPOINT_URL = 'http://localhost:3003/todo'

const todoApi = {
    async getAll() {
        const result = await axios.get(ENDPOINT_URL);
        return result.data;
    },
    async post(todo) {
        const result = await axios.post(ENDPOINT_URL, todo);
        return result.data;
    },
    async delete(todo) {
        const result = await axios.delete(ENDPOINT_URL + '/' + todo.id);
        return result.data;
    },
    async patch(todo) {
        const result = await axios.put(ENDPOINT_URL + '/' + todo.id, todo);
        return result.data;
    }
}

// APIアクセスの挙動を確認したい場合、関数を呼び出してみる
todoApi.post({
    id: 12345,
    content: "test"
});

export default todoApi;
```

## 177_リクエストと画面処理を統合しよう
[toTop](#)

- 練習問題：『Todoアプリに`axios`のデータアクセスを加えよう』
- サンプルコード：[050_axios_get_state/end](./src/060_other_method/end/)
  * `useContext`で状態管理しているステートにAPIアクセス処理を加えてる
- 練習コード：[050_axios_get_state/start](./src/060_other_method/start/)
  

## 178_【発展】ダイナミックインポートとは？
[toTop](#)

- `import`文に相当する関数`import()`を利用してモジュールを詠み込む
  * `import()`の返り値はPromiseなので、非同期処理(`then`)でつないで動的に読み込める
  * その時々でモジュール読込み、モジュール切り替えができるようになる

### 通常のimport処理
```jsx
import { add } from "./add";
const Example = () => {
    // 詠み込んだ関数を呼び出す
    console.log(add(1,2));
};
export default Example;
```

### ダイナミックインポートを利用した処理
```jsx
// POINT ダイナミックインポートとは
const Example = () => {
    const dynamicImport = async () => {
        const module = await import("./add");
        // console.log(module);
    }
    dynamicImport();

    // console.log(add(1,2))
    console.log(module(1,2));
};

export default Example;
```


## 179_【発展】コンポーネントのダイナミックインポート
[toTop](#)

- Reactのコンポーネントをダイナミックインポートで読み込んでみる
  * Reactの`lazy`で動的にコンポーネントを詠み込める
  * 読込みをしているのをユーザに示すため、Suspenseコンポーネントが用意されている
  * ネットワーク処理を疑似的に遅くしたい場合、ChromeDevToolsで変更できる
    * ネットワークのプリセット処理を『低速 3G』に変更する

### 初期状態
```jsx
// POINT コンポーネントをダイナミックインポート
import { useState } from "react";
import ComponentA from "./components/ComponentA";

const Example = () => {
  const [compA, setCompA] = useState(true);

  return (
    <>
      <button onClick={() => {
        setCompA((prev) => !prev)
      }}>ComponentA</button>
      {compA && <ComponentA />}
    </>
  );
};

export default Example;
```

### ダイナミックインポートを使った状態
```jsx
// POINT コンポーネントをダイナミックインポート
import { useState, lazy, Suspense, startTransition } from "react";

// lazy経由でimport関数を使う
const LazyComponentA = lazy(() => import('./components/ComponentA'))
const LazyComponentB = lazy(() => import('./components/ComponentB'))

const Example = () => {
  // const [compA, setCompA] = useState(true);
  const [compA, setCompA] = useState(false);

  return (
    <>
      <button onClick={() => {
        startTransition(() => {
          setCompA((prev) => !prev)
        })
      }}>ComponentA</button>

      {/* Suspenseコンポーネントで囲むとlazyの読出し中の表示を切り替えられる */}
      <Suspense fallback={<div>Loading!!!!!!!!</div>}>
        {compA ? <LazyComponentA /> : <LazyComponentB />}
      </Suspense>
    </>
  );
};

export default Example;
```
