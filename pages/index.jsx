import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import { getCookies, getCookie, setCookie, removeCookies } from "cookies-next";
import MyStopwatch from "../components/MyStopwatch"
import { useRouter } from 'next/router'

export default function Home(props) {
  //state to contain all data for tasks
  const [dataBase, setDataBase] = useState([]);
  const [rerender, setRerender] = useState(false)
  const router = useRouter()
  console.log(`rerender happerned`);
  //set cookie of start time
  useEffect(() => {
    function getTimestampInSeconds() {
      return Math.floor(Date.now() / 1000);
    }
    if (!getCookie("startTime")) {
      setCookie("startTime", getTimestampInSeconds());
      
      router.reload(window.location.pathname)
      // setRerender(!rerender)
    }

    return () => {};
  });
  console.log(`dataBase`, dataBase);
  // console.log(`props for HOME component`, props);

 
  return (
    <Layout>
      <div className="timer">
        <MyStopwatch setDataBase={setDataBase} dataBase={dataBase} rerender={rerender} setRerender={setRerender} />
      </div>
    </Layout>
  );
}
