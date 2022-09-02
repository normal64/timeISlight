import { useState, useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import { getCookies, getCookie, setCookie, removeCookies ,deleteCookie} from "cookies-next";

const MyStopwatch = (props) => {
    
        //state for description of the task
        const [taskDescription, setTaskDescription] = useState("");
        const [timeStoredSec, setTimeStoredSec] = useState();
        const [refresh, setRefresh] = useState(false);
        console.log(`timeStoredSec`, timeStoredSec);
        useEffect(() => {
          const handleTabClose = (event) => {
            event.preventDefault();
            setRefresh(!refresh);
          };
          window.addEventListener("beforeunload", handleTabClose);
          window.addEventListener("reload", handleTabClose);
          return () => {
            window.removeEventListener("beforeunload", handleTabClose);
            window.removeEventListener("reload", handleTabClose);
          };
        });
        const stopwatchOffset = new Date();
        getCookies();
        useEffect(() => {
            
          setTimeStoredSec(
            Math.floor(Date.now() / 1000) - Number(getCookie("startTime"))
          );
          return () => {};
        });
        console.log(`props`, props);
    
        stopwatchOffset.setSeconds(
          Math.floor(Date.now() / 1000)  - Number(getCookie("startTime"))
        );
    
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
          
          
         
          // setTimeStoredSec(getTimestampInSeconds())
          
          deleteCookie("startTime")
          props.setRerender(!props.renderState)
          
        };
    
        return timeStoredSec ? (
          <div style={{ textAlign: "center" }}>
            {timeStoredSec ? "goood" : "loading"}
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
        ) : (
          "loading"
        );
      
    
}

export default MyStopwatch
