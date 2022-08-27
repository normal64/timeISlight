import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import {useState} from "react"
import { useStopwatch } from "react-timer-hook";

export default function Home(props) {
  const [dataBase, setDataBase] = useState([])
  console.log(`dataBase`, dataBase);
  

function MyStopwatch(props) {
  const [taskDescription, setTaskDescription] = useState("")
  
  const stopwatchOffset = new Date();
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() );
  //adding task description to array in main component state
  const addTask = (e) =>{
    props.setDataBase([ ...props.dataBase,{
      "description":  taskDescription,
      "timeStamp": hourTime+minuteTime+secondTime
    }
     ])
  }
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    reset,
  
  } = useStopwatch({ autoStart: true, offsetTimestamp: stopwatchOffset });
  const hourTime = hours < 10 ? `0${hours}` : `${hours}`;
  const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`;
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
              <input type="text" 
                id="fname" 
                name="fname" 
                value={taskDescription} 
                placeholder="Enter a task" 
                onChange={(e) => setTaskDescription(e.target.value)}  
              />
              <br />
              <div className="container-buttons">
              <input type="button" value="Reset" onClick={reset}/>
              <input type="button" value="Add" onClick={addTask}/>
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
