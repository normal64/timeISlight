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
  console.log("main component rerender");
  // console.log(`props for HOME component`, props);

  function MyStopwatch(props) {
    //state for description of the task
    const [taskDescription, setTaskDescription] = useState("");
    const [timeStoredSec, setTimeStoredSec] = useState(null);
   // console.log(`timeStoredSec`, timeStoredSec);
    const [startTime, setStartTime] = useState(0)
    const stopwatchOffset = new Date();
    //set state of start time
    // useEffect(() => {
    //   function getTimestampInSeconds () {
    //     return Math.floor(Date.now() / 1000)
    //   }
      
    //   setCookie("startTime", getTimestampInSeconds());
    //   return () => {
    //   }
    // })
    console.log(`startTime`, startTime);
  


    stopwatchOffset.setSeconds( (stopwatchOffset.getSeconds() ));
    
    
    const { seconds, minutes, hours, isRunning, start, reset } = useStopwatch({
      autoStart: true,
      offsetTimestamp: stopwatchOffset,
    });
    const hourTime = hours < 10 ? `0${hours}` : `${hours}`;
    const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`;
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
  

    return (   
      <div style={{ textAlign: "center" }}>
        
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
              <input type="button" value="Reset" onClick={() =>reset()} />
              <input type="button" value="Add" onClick={() =>addTask()} />
            </div>
          </fieldset>
        </form>
      </div>     
      
      
      
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
