import Head from "next/head";
import Link from "next/link";
import Image from "next/image"

const Layout = (props) => {
  return (
    <>
      <Head>
        <title>timeISlight</title>

        <meta
          name="timeISlight"
          content="Application to track time spent on tasks"
        />
        <meta property="denis dev blog" content="nice guy to hire" />
      </Head>
      <aside className="sidebar">
          <h2>timeISlite</h2>
          <nav>
              <Link href="/"><a><Image  src="/clock.png" width={32} height={32}></Image></a></Link>
              <Link href="/log"><a><Image  src="/clock.png" width={32} height={32}></Image></a></Link>
              <Link href="/summary"><a><Image  src="/clock.png" width={32} height={32}></Image></a></Link>
          </nav>
          <div>FAQ</div>
          </aside>
      layoutP{props.children}
    </>
  );
};

export default Layout;
