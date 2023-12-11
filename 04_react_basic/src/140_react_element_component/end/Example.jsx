// POINT React要素とコンポーネントの関係
import React from "react";

const Bye = () => {
      return <h2>GoodBye!</h2>;
}

// const Hello = () => {
//   return <h1>Hello</h1>;
// }

const Example = () => {
  return (
    <div>
      <Bye/>
      {/* <Hello/> */}
    </div>
  );
};

console.log(Example());
// {
//   "type": "div",
//   "key": null,
//   "ref": null,
//   "props": {
//       "children": {
//           "key": null,
//           "ref": null,
//           "props": {},
//           "_owner": null,
//           "_store": {}
//       }
//   },
//   "_owner": null,
//   "_store": {}
// }

export default Example;

