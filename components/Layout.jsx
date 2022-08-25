import Head from "next/head";
import Link from "next/link";

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
          sidebar
          </aside>
      layoutP{props.children}
    </>
  );
};

export default Layout;
