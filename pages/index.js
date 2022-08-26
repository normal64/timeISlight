import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";

export default function Home(props) {
  return (
    <Layout>
      <div className="timer">
        <div className="task-time">00:00:00</div>
        <form action="">
          <fieldset>
            <legend>Controls:</legend>
              
              <input type="text" id="fname" name="fname" placeholder="Enter a task" />
              <br />
              <div className="container-buttons">
              <input type="button" value="Reset" />
              <input type="button" value="Add" />
            </div>
          </fieldset>
        </form>
      </div>
    </Layout>
  );
}
