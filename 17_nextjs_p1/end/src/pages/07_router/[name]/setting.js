import { useRouter } from "next/router";

// http://localhost:4000/07_router/hello/setting

// router.pushのドキュメント
// https://nextjs-ja-translation-docs.vercel.app/docs/api-reference/next/router#routerpush

export default function Setting({ query }) {
    console.log(query);
    // {name: 'hello'}

    const router = useRouter();
    console.log(router.query);

    const clickHandler = () => {
        // `router.push()`メソッド：ページ遷移する
        router.push('/'); // トップページに遷移する

        // router.pushの第２引数：トップページに移動するが、URLは`dummy-url`になる
        // router.push('/', '/dummy-url');

        // `router.replace()` メソッド：
        // - `push`と同様に遷移するが、遷移したときに現ページのブラウザの履歴に残さない
        // - ほかに、`router.back()`というメソッドで履歴をさかのぼる機能もある
        // router.replace('/', '/dummy-url')

        // router.reload()メソッド：同じページをリロードする（ブラウザの更新ボタン）
        // router.reload()
    }
    return (
        <>
            <h1>props から取得:{query.name}</h1>
            <h1>routerから取得:{router.query.name}</h1>
            <button onClick={clickHandler}>アクションによる画面遷移</button>
        </>
    )
}

// export async function getServerSideProps(context) {
export async function getServerSideProps({ query }) {
    // console.log(context.query);
    // { name: 'hello' }
    // const query = context.query; // ただし、これは`undefined`になってしまうようだ
    // console.log(query);
    // { name: 'hello' }
    // 上が`pnpm run dev`実行してるコンソールに表示される

    return {
        props: { query }
    }
}
