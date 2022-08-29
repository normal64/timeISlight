import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import { getCookies, getCookie, setCookie, removeCookies } from "cookies-next";

export default function Home(props) {
  //state to contain all data for tasks
  const [dataBase, setDataBase] = useState([]);
  console.log(`dataBase`, dataBase);
  console.log(`props for HOME component`, props);

  function MyStopwatch(props) {
    //state for description of the task
    const [taskDescription, setTaskDescription] = useState("");
    const [timeStoredSec, setTimeStoredSec] = useState(null);

    console.log(`timeStoredSec`, timeStoredSec);
    const stopwatchOffset = new Date();
    getCookies();
    useEffect(() => {
      setTimeStoredSec(Number(getCookie("currentTimeForTaskInSec")));
      console.log(
        "use effect to set TimerSToredSec",
        Number(getCookie("currentTimeForTaskInSec"))
      );
      
      return () => {};
    });

    console.log("seting timer in programm +value insec", timeStoredSec);
    stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + Number(getCookie("currentTimeForTaskInSec")));
    
    //adding task description to array in main component state
    const addTask = (e) => {
      props.setDataBase([
        ...props.dataBase,
        {
          description: taskDescription,
          timeStamp: hourTime + minuteTime + secondTime,
        },
      ]);
    };
    
    const { seconds, minutes, hours, isRunning, start, reset } = useStopwatch({
      autoStart: true,
      offsetTimestamp: stopwatchOffset,
    });
    const hourTime = hours < 10 ? `0${hours}` : `${hours}`;
    const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`;
    //adding to local storage and cookies on every render
    useEffect(() => {
      if (typeof window !== "undefined") {
        // Perform localStorage action
        let secondsTask = hours * 60 * 60 + minutes * 60 + seconds;
        // console.log(`secondsTask`, secondsTask);
        localStorage.setItem("currentTimeForTaskInSec", secondsTask);
        setCookie("currentTimeForTaskInSec", Number(secondsTask));
        setCookie('test', 'value', { maxAge: 60 * 6 * 24 });
      }
      return () => {};
    });

    return (   timeStoredSec ? 
      <div style={{ textAlign: "center" }}>
        {timeStoredSec? "goood" : "loading"}
        <div style={{ fontSize: "100px" }}>
          <span>{hourTime}</span>:<span>{minuteTime}</span>:
          <span>{secondTime}</span>
        </div>
        {/* Pause is removed mb makes sense to remove p */}
        <p>{isRunning ? "Running" : "Not running"}</p>
        <form action="">
          <fieldset>
            <legend>Controls:</legend>
            <input
              type="text"
              id="fname"
              name="fname"
              value={taskDescription}
              placeholder="Enter a task"
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <br />
            <div className="container-buttons">
              <input type="button" value="Reset" onClick={reset} />
              <input type="button" value="Add" onClick={addTask} />
            </div>
          </fieldset>
        </form>
      </div>     
    :   
    "loading"    
      
      
    );
  }
  return (
    <Layout>
      <div className="timer">
        
          <MyStopwatch setDataBase={setDataBase} dataBase={dataBase} />
       
      </div>
    </Layout>
  );
}
