[to TopPage](../README.md)

# 10_【発展】関数型プログラミング

## 講座一覧
- [100_セクション紹介](#100_セクション紹介)
- [101_関数型プログラミングとは？](#101_関数型プログラミングとは？)
- [102_状態と処理の分離](#102_状態と処理の分離)
- [103_純粋関数](#103_純粋関数)
- [104_不変性（immutability）【Part．1】](#104_不変性（immutability）【Part．1】)
- [105_不変性（immutability）【Part．2】](#105_不変性（immutability）【Part．2】)
- [106_Reactと純粋関数](#106_Reactと純粋関数)
- [107_Reactにおける状態と処理の分離](#107_Reactにおける状態と処理の分離)
- [108_Reactにおける不変性](#108_Reactにおける不変性)
- [109_【まとめ】関数型プログラミング](#109_【まとめ】関数型プログラミング)
- [110_JavaScriptコードと見比べてみよう](#110_JavaScriptコードと見比べてみよう)


## 100_セクション紹介
[toTop](#)

- React は16.18.0 で導入されたHooksにより関数型プログラミングに方向が変わった
  * この章では、関数型プログラミングの解説とReact でどう適用されているかを紹介

## 101_関数型プログラミングとは？
[toTop](#)

- （値の）状態と処理を分離して管理
  * A(data) -> B(data) -> C(data) -> 結果

## 102_状態と処理の分離
[toTop](#)

- [サンプルコード](./src/010_data_procedure/end/Example.js)

- 状態と処理は切り離す
```jsx
  const nums = [1,2,3]; // 状態
  const sum = (arry) => arry.reduce((accu, curr) => accu + curr) // 処理 -> (結果) -> 状態
```

## 103_純粋関数
[toTop](#)

- [サンプルコード](./src/020_pure_function/end/Example.js)
- 関数型（純粋関数）
* POINT fn(決まった引数) -> 決まった戻り値
  * POINT 関数外の状態（データ）は参照・変更しない。
    * 引数を起点にして処理をして結果を返す
  * POINT 関数外に影響を及ぼさない。
  * 引数で渡された値を変更しない。
    * 不変性()
* 上記の要件を満たさない操作は「副作用」と呼ぶ。
  * 外部変数を参照したら副作用
  * 関数内の`console.log`も副作用ととらえられる

## 104_不変性（immutability）【Part．1】
[toTop](#)

- [サンプルコード](./src/030_immutability/end/Example.js)
- POINT 引数で渡された値を変更しない。（Immutabilityの保持）
  * 上記の要件を満たさない操作は「副作用」と呼ぶ。
```jsx
  const num = { val: 2 }
  
  const double = (num) => {
    const newNum = { val: num.val * 2 };
    // newNum.val = num.val * 2;
    return newNum;
  }

  const newNum = double(num);
  console.log('newNum', newNum, 'num', num)
  console.log(newNum === num); // false
```

## 105_不変性（immutability）【Part．2】
[toTop](#)

- プログラミング上、データはイミュータブルとミュータブルで分類される
  * イミュータブル：Immutabie。書換不可（元の値は変わらない）
    * 文字列、数値、BigInt、真偽値、undefined、シンボル
  * ミュータブル：Mutable。元の値が変わる
    * イミュータブルな値以外。オブジェクト（Object、Arrayなど）

- 関数型プログラミングと

## 106_Reactと純粋関数
[toTop](#)

- [サンプルコード](./src/040_react_pure_fn/end/Example.js)

- Reactで禁止されている記述
  * 外部変数の参照禁止
```jsx
// POINT Reactと純粋関数
let value = 0;

const Child = () => {
  value++;
  return <div>{value}</div>
}

const ChildPure = ({ value }) => {
  return <div>{value}</div>
}

const Example = () => {
//   let value = 0; // この定義がない場合、`value`は外部変数を参照してしまう（禁止）

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

- [サンプルコード](./src/050_react_data_procedure/end/Example.js)
- Reactの`useState`は純粋関数の定義とは外れる。が実用的な妥協点
  * 純粋関数で記述すると、Rootコンポーネントですべてのステートを定義すればよいが実装しにくい

## 108_Reactにおける不変性
[toTop](#)

- [サンプルコード](./src/060_react_immutability/end/Example.js)
- 引数で渡された値を変更しない。（★Immutability）

## 109_【まとめ】関数型プログラミング
[toTop](#)


## 110_JavaScriptコードと見比べてみよう
[toTop](#)

- [JavaScriptコード](./src/070_js_vs_react/start/Example.js)
- [サンプルコード](./src/070_js_vs_react/end/Example.js)
