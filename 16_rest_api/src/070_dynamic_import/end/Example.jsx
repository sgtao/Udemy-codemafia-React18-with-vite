// POINT ダイナミックインポートとは
const Example = () => {
    const dynamicImport = async () => {
        const module = await import("./add.jsx");
        console.log(module);
    }
    dynamicImport();
    // console.log(add(1,2))
};

export default Example;
