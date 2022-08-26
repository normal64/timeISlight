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
        <div className="container-title">
        <h2>timeISlite</h2>
        </div>
          
          <nav>
              <Link href="/"><a><Image  src="/clock.png" width={32} height={32}></Image></a></Link>
              <Link href="/log"><a><Image  src="/clipboard.png" width={32} height={32}></Image></a></Link>
              <Link href="/summary"><a><Image  src="/report.png" width={32} height={32}></Image></a></Link>
          </nav>
          <div className="container-faq">FAQ</div>
          </aside>
          {props.children}
    </>
  );
};

export default Layout;
