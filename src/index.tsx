import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import VictoryRadar from "./VICTORY-radar";
import {App} from "./App";
import ReChart from "./reChart";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <App/>
      {/*<VictoryRadar/>*/}
    {/*<ReChart/>*/}
  </React.StrictMode>
);
