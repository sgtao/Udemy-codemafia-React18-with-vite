import "./Child.css";

const Child = () => {
  const a = 1 === 1;
  console.log(a);
  const hello = (a)  => {
    if (a)
      return 'hello'
    else
      return 'false'
  }
  return (
    <div className="component">
      <h3>式と文</h3>
      {1 === 1} {/* 左は式なので、波カッコ内に書ける*/}
      {/* if (a) { 'hello'} */}{/* 左の記述は文となるため、波カッコ内に書けない*/}
      {hello(a)}
    </div>
  );
};

export default Child;
