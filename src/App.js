import { useState, useEffect, Fragment } from 'react';
import { csv } from 'd3';
import './App.css';
import ellipticNodes from './datasets/elliptic_txs_classes.csv';
import ellipticEdges from './datasets/elliptic_txs_edgelist.csv';
import { formatData } from './utils';
import Graph3D from './Graph3D';
import Graph2D from './Graph2D';

const App = () => {
  // call formatData and save the result in a variable
  // use the useEffect hook to call the formatData function
  const [nodeData, setNodeData] = useState();
  const [edgeData, setEdgeData] = useState();
  const [seedTxId, setSeedTxId] = useState('355110272');

  useEffect(() => {
    csv(ellipticNodes).then((data) => {
      setNodeData(data);
    });
    csv(ellipticEdges).then((data) => {
      setEdgeData(data);
    });
  }, []);

  const graphData = nodeData && edgeData ? formatData(nodeData, edgeData, seedTxId, 500) : null;
  // console.log(graphData);

  return <div className="App">{graphData ? showGraphs(graphData, setSeedTxId) : null}</div>;
};

const showGraphs = (graphData, setSeedTxId) => {
  return (
    <div className="container">
      <div className="navbar">
        <div className="proj-info">
          <div className="title">Identifying Illicit Behavior in the Blockchain</div>
          <div className="team">Team 126</div>
        </div>
        <div className="tabs">
          <button className="tablinks" onClick={() => showGraph('3D')}>
            3D
          </button>
          <button className="tablinks" onClick={() => showGraph('2D')} style={{ border: 'none' }}>
            2D
          </button>
          <label htmlFor="seedTxId" className="root-select-label">
            Root Transaction ID#
          </label>
          <select
            className="seedTxId"
            onChange={(e) => {
              setSeedTxId(e.target.value);
            }}
          >
            <option value="355110272">355110272</option>
            <option value="102570">102570</option>
            <option value="565334">565334</option>
          </select>
        </div>
      </div>
      <div className="graphs">
        <div className="graph-3d">
          <Graph3D graphData={graphData} />
        </div>
        <div className="graph-2d">
          <Graph2D graphData={graphData} />
        </div>
      </div>
    </div>
  );
};

const showGraph = (graphType) => {
  const graph2D = document.getElementsByClassName('graph-2d');
  const graph3D = document.getElementsByClassName('graph-3d');
  const buttons = document.getElementsByClassName('tablinks');

  if (graphType === '3D') {
    graph2D[0].style.display = 'none';
    graph3D[0].style.display = 'block';
    buttons[0].style.border = 'solid';
    buttons[1].style.border = 'none';
  } else {
    graph2D[0].style.display = 'block';
    graph3D[0].style.display = 'none';
    buttons[0].style.border = 'none';
    buttons[1].style.border = 'solid';
  }
};

export default App;
