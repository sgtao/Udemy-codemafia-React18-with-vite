[to TopPage](../README.md)

# 08_ReactでDOM操作を行う方法

## 講座一覧
- [084_セクション紹介](#084_セクション紹介)
- [085_【createPortal】モーダルの作り方](#085_【createPortal】モーダルの作り方)
- [086_【Bubbling】Portalを使う際の注意点！](#086_【Bubbling】Portalを使う際の注意点！)
- [087_【練習＆解答】createPortalでトーストを作成してみよう](#087_【練習＆解答】createPortalでトーストを作成してみよう)
- [088_【useRef】refでDOMを直接操作してみよう](#088_【useRef】refでDOMを直接操作してみよう)
- [089_【useRef】refで動画プレイヤーを作成してみよう](#089_【useRef】refで動画プレイヤーを作成してみよう)
- [090_【useRef】refとは？refとstateの違い](#090_【useRef】refとは？refとstateの違い)
- [091_【forwardRef】他のコンポーネントのDOMにアクセスする方法](#091_【forwardRef】他のコンポーネントのDOMにアクセスする方法)
- [092_【useImperativeHandle】refへのアクセスを限定する方法](#092_【useImperativeHandle】refへのアクセスを限定する方法)
- [093_【練習＆解答】refの使い方](#093_【練習＆解答】refの使い方)
- [094_セクションまとめ](#094_セクションまとめ)


## 084_セクション紹介
[toTop](#)
- このセクションでは、通常のReactでは行いが、`UseRef`で実現するDOM 操作について紹介

## 085_【createPortal】モーダルの作り方
[toTop](#)

- `createPortal(子、DOM要素)`により、ポータルの子要素を直接の親要素以外の別DOM要素にマウントできる
  * 例：親要素の親要素などで、モーダル画面を作成できる

- 定義方法：
```jsx
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./components/Modal";

/* POINT createPortalの使い方
第一引数: React の子要素としてレンダー可能なもの （要素、文字列、フラグメント、コンポーネントなど）
第二引数: レンダー先のDOM要素
*/
const ModalPortal = ({ children }) => {
  const target = document.querySelector(".container.end");

  // 第一引数（children（コンポーネント））を第二引数（target）にマウントする
  return createPortal(children, target);
};
```

- 利用例：
```jsx
      {modalOpen && (
        <ModalPortal>
          <Modal handleCloseClick={() => setModalOpen(false)} />
        </ModalPortal>
      )}
```

### ソースコード

- [end source](./src/010_portals/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./components/Modal";

/* POINT createPortalの使い方
第一引数: React の子要素としてレンダー可能なもの （要素、文字列、フラグメント、コンポーネントなど）
第二引数: レンダー先のDOM要素
*/
const ModalPortal = ({ children }) => {
  const target = document.querySelector(".container.end");
  return createPortal(children, target);
};

const Example = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div onClick={() => console.log('空のdiv')}>
      <div className="container end" onClick={() => console.log('container')} />

      <button
        type="button"
        onClick={() => setModalOpen(true)}
        disabled={modalOpen}
      >
        モーダルを表示する
      </button>

      {modalOpen && (
        <ModalPortal>
          <Modal handleCloseClick={() => setModalOpen(false)} />
        </ModalPortal>
      )}
    </div>
  );
};

export default Example;
```


## 086_【Bubbling】Portalを使う際の注意点！
[toTop](#)

- Portalを使う際の注意点！：イベントのバブリング
  * 例：子要素のクリックイベントが親要素のイベントに波及する
  * 親要素で、`onClick()`を定義していると、子要素のクリックイベント（モーダル表示）の際に親要素のクリックイベントも発生する

## 087_【練習＆解答】createPortalでトーストを作成してみよう
[toTop](#)

### 練習問題：トーストの作成（createPortal）
- ボタンを押すと.container.start要素にマウントされて、表示されるトーストを作成してください。
  * トーストにはToastコンポーネントを使用してください。

- [start source](./src/020_practice_portals/start/Example.jsx))
- 問題：
```jsx
import { useState } from "react";
import Toast from "./components/Toast";

const Example = () => {
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <div>
      <h3>
        トーストの作成（createPortal）
      </h3>
      <p>ボタンを押すと.container.start要素にマウントされて、表示されるトーストを作成してください。トーストにはToastコンポーネントを使用してください。</p>

      <div className="container start"></div>
      
      <button
        type="button"
        onClick={() => setToastOpen(true)}
        disabled={toastOpen}
      >
        トーストを表示する
      </button>
      {toastOpen && (
          <Toast
            visible={toastOpen}
            handleCloseClick={() => setToastOpen(false)}
          />
      )}
    </div>
  );
};

export default Example;
```

### 試案：
- `createPortal`を追加
```jsx
import { createPortal } from "react-dom";
const ToastPortal = ({ children }) => {
  const target = document.querySelector(".container.end");
  return createPortal(children, target);
};
...
      <button
        type="button"
        onClick={() => setToastOpen(true)}
        disabled={toastOpen}
      >
        トーストを表示する
      </button>
      {toastOpen && (
        <ToastPortal>
          <Toast
            visible={toastOpen}
            handleCloseClick={() => setToastOpen(false)}
          />
        </ToastPortal>
      )}
```


### ソースコード

- [end source](./src/020_practice_portals/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState } from "react";
import { createPortal } from "react-dom";
import Toast from "./components/Toast";

const ToastPortal = ({ children }) => {
  const target = document.querySelector(".container.end");
  return createPortal(children, target);
};

const Example = () => {
  const [toastOpen, setToastOpen] = useState(false);
  return (
    <div>
      <div className="container end"></div>

      <button
        type="button"
        onClick={() => setToastOpen(true)}
        disabled={toastOpen}
      >
        トーストを表示する
      </button>

      {toastOpen && (
        <ToastPortal>
          <Toast
            visible={toastOpen}
            handleCloseClick={() => setToastOpen(false)}
          />
        </ToastPortal>
      )}
    </div>
  );
};

export default Example;
```

- `Toast` component
```jsx
import "./Toast.css";

const Toast = ({ visible, handleCloseClick }) => {
  const toastClassName = visible ? "toast is-visible" : "toast";
  return (
    <div className={toastClassName}>
      <div className="toast__content">
        <p>トースト</p>
        <button
          type="button"
          className="toast__button"
          onClick={handleCloseClick}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
```


## 088_【useRef】refでDOMを直接操作してみよう
[toTop](#)


- [end source](./src/030_useRef/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState, useRef } from "react";

/* POINT useRefでDOMを取得
refオブジェクトをref属性に渡すとDOMを参照することができます。
*/
const Case1 = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef();

  // console.log(inputRef);

  return (
    <div>
      <h3>ユースケース1</h3>
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => inputRef.current.focus()}>
        インプット要素をフォーカスする
      </button>
    </div>
  );
};

// POINT 動画の再生・停止を制御
const Case2 = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef();

  return (
    <div>
      <h3>ユースケース2</h3>
      <video style={{ maxWidth: "100%" }} ref={videoRef}>
        <source src="./sample.mp4"></source>
      </video>
      <button
        onClick={() => {
          if (playing) {
            videoRef.current.pause();
          } else {
            videoRef.current.play();
          }

          setPlaying((prev) => !prev);
        }}
      >
        {playing ? "Stop" : "Play"}
      </button>
    </div>
  );
};

const createTimeStamp = () => new Date().getTime();

/* POINT useRefは再レンダリングされません。
書き換え可能な情報としてコンポーネントに保持させておくことができます。
state は更新されるごとに再レンダーされますが、refオブジェクトの中身が変わっても再レンダーが走ることはありません。
*/
const Case3 = () => {
  const [timeStamp, setValue] = useState(createTimeStamp());
  const ref = useRef(createTimeStamp());

  const updateState = () => {
    setValue(createTimeStamp());
  };

  const updateRef = () => {
    /* コンソールを見るとブラウザの表示と、ref.currentの中身が異なることを確認できます */
    ref.current = createTimeStamp();
    console.log("ref.current -> ", ref.current);
  };
  return (
    <div>
      <h3>ユースケース3</h3>
      <p>
        state: {timeStamp}
        <button onClick={updateState}>更新</button>
      </p>
      <p>
        ref: {ref.current}
        <button onClick={updateRef}>更新</button>
      </p>
    </div>
  );
};

/* POINT refを使うべきタイミング
Reactは一般的に、propsを通して親から子へ作用させる、というデータフローが原則です。
refを使ってコンポーネントに作用を起こすことは、その原則を崩す行為なので多用は避けましょう。

refに適した使用例は以下の場合とされています。
- フォームへのフォーカス、テキストの選択、メディア（動画・音声）の再生の管理
- アニメーションの発火
- サードパーティの DOM や、React管理外のDOMの埋め込み
*/
const Example = () => {
  return (
    <>
      <Case1 />
      <Case2 />
      <Case3 />
    </>
  );
};

export default Example;
```

## 089_【useRef】refで動画プレイヤーを作成してみよう
[toTop](#)

## 090_【useRef】refとは？refとstateの違い
[toTop](#)


## 091_【forwardRef】他のコンポーネントのDOMにアクセスする方法
[toTop](#)

- [end source](./src/040_forwardRef/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useRef, forwardRef } from "react";

/* POINT forwardRef
子コンポーネント内の DOM に直接アクセスしたいときに使います。
refは、親から子コンポーネントへprops形式で渡して参照するということができないため、
参照したい場合は子コンポーネント内でfowardRefを使用する必要があります。
*/
const Input = forwardRef((props, ref) => {
  return <input type="text" ref={ref} />;
});

const Example = () => {
  const ref = useRef();
  return (
    <>
      <Input ref={ref} />
      <button onClick={() => ref.current.focus()}>
        インプット要素をフォーカスする
      </button>
    </>
  );
};

export default Example;
```


## 092_【useImperativeHandle】refへのアクセスを限定する方法
[toTop](#)

- [end source](./src/050_useImperativeHandle/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useRef, forwardRef, useImperativeHandle } from "react";

// POINT 親からのrefへの参照を制限
const Input = forwardRef((props, ref) => {

  const inputRef = useRef();
  
  /* POINT useImperativeHandle
  第1引数: 親コンポーネントから受け取ったrefオブジェクト
  第2引数: 追加したいメソッドが格納されたオブジェクトを返す関数
   */
  useImperativeHandle(ref, () => ({
    myFocus() {
      inputRef.current.focus();
      console.log('フォーカス取得')
    }
  }))

  return <input type="text" ref={inputRef} />;
});

const Example = () => {
  const ref = useRef();
  return (
    <>
      <Input ref={ref} />
      <button onClick={() => ref.current.myFocus()}>
        インプット要素をフォーカスする
      </button>
    </>
  );
};

export default Example;
```

## 093_【練習＆解答】refの使い方
[toTop](#)

- [end source](./src/060_practice_ref/end/Example.jsx)
- エントリーコンポーネント：
```jsx
import { useState, useRef, forwardRef, useImperativeHandle } from "react";

const Video = forwardRef(({ path }, ref) => {
  const videoRef = useRef();

  useImperativeHandle(ref, () => ({
    play() {
      videoRef.current.play();
    },
    stop() {
      videoRef.current.pause();
    },
  }));

  return (
    <video style={{ maxWidth: "100%" }} ref={videoRef}>
      <source src={path}></source>
    </video>
  );
});

const Example = () => {
  const [playing, setPlaying] = useState(false);

  const ref = useRef();

  return (
    <div>
      <Video ref={ref} path="./sample.mp4" />
      <button
        onClick={() => {
          if (playing) {
            ref.current.stop();
          } else {
            ref.current.play();
          }
          setPlaying((prev) => !prev);
        }}
      >
        {playing ? "Stop" : "Play"}
      </button>
    </div>
  );
};

export default Example;
```

## 094_セクションまとめ
[toTop](#)

