import { Fragment } from "react";
import "./App.scss"
import Sidebar from "./components/Sidebar/Sidebar";
import Map from "./components/Map/Map";


function App() {
  return (
    <Fragment>
        <div className="main-container">
          <Sidebar/>
          <Map/>
        </div>
    </Fragment>
  );
}

export default App;
