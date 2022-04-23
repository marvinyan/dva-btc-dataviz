import { useState, useEffect, Fragment } from 'react';
import { csv } from 'd3';
import './App.css';
import predictedNodes from './datasets/df_classes_with_predicted_vals.csv';
import ellipticEdges from './datasets/elliptic_txs_edgelist.csv';
import { formatData } from './utils';
import Graph3D from './Graph3D';
import Graph2D from './Graph2D';
import ReactTooltip from 'react-tooltip';

const App = () => {
  const [nodeData, setNodeData] = useState();
  const [edgeData, setEdgeData] = useState();
  const [seedTxId, setSeedTxId] = useState('355110272');
  const [vizMode, setVizMode] = useState('3D');

  useEffect(() => {
    csv(predictedNodes).then((data) => {
      setNodeData(data);
    });
    csv(ellipticEdges).then((data) => {
      setEdgeData(data);
    });
  }, []);

  const graphData = nodeData && edgeData ? formatData(nodeData, edgeData, seedTxId, 500) : null;

  return <div className="App">{graphData ? showGraphs(graphData, setSeedTxId, setVizMode, vizMode) : null}</div>;
};

const showGraphs = (graphData, setSeedTxId, setVizMode, vizMode) => {
  return (
    <div className="container">
      <div className="navbar">
        <div className="proj-info">
          <div className="title">Identifying Illicit Behavior in the Bitcoin Blockchain</div>
          <div className="team">Team 126</div>
        </div>
        <div className="tabs">
          <button className="tablinks" onClick={() => showGraph('3D', setVizMode)}>
            3D
          </button>
          <button className="tablinks" onClick={() => showGraph('2D', setVizMode)} style={{ border: 'none' }}>
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
          <a data-tip data-for="legend" className="legend-label">
            Legend
          </a>
          <ReactTooltip id="legend" className="legend-tooltip" place="bottom" type="light" effect="solid">
            {vizMode === '3D' ? (
              <Fragment>
                <h3>Node Colors</h3>
                <p>
                  <span className="green-text">Green:</span> Licit (Correct Prediction)
                </p>
                <p>
                  <span className="red-text">Red:</span> Illicit (Correct Prediction)
                </p>
                <p>
                  <span className="fuchsia-text">Fuchsia:</span> Incorrect Prediction
                </p>
                <p>
                  <span className="gray-text">Gray:</span> Unknown
                </p>
              </Fragment>
            ) : (
              <Fragment>
                <h3>Inner Circle</h3>
                <p>
                  <span className="green-text">Green:</span> Licit
                </p>
                <p>
                  <span className="red-text">Red:</span> Illicit
                </p>
                <p>
                  <span className="gray-text">Gray:</span> Unknown
                </p>
                <h3>Outer Ring</h3>
                <p>
                  <span className="cyan-text">Cyan:</span> Correct Prediction
                </p>
                <p>
                  <span className="fuchsia-text">Fuchsia:</span> Incorrect Prediction
                </p>
              </Fragment>
            )}
          </ReactTooltip>
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

const showGraph = (graphType, setVizMode) => {
  const graph2D = document.getElementsByClassName('graph-2d');
  const graph3D = document.getElementsByClassName('graph-3d');
  const buttons = document.getElementsByClassName('tablinks');

  if (graphType === '3D') {
    setVizMode('3D');
    graph2D[0].style.display = 'none';
    graph3D[0].style.display = 'block';
    buttons[0].style.border = 'solid';
    buttons[1].style.border = 'none';
  } else {
    setVizMode('2D');
    graph2D[0].style.display = 'block';
    graph3D[0].style.display = 'none';
    buttons[0].style.border = 'none';
    buttons[1].style.border = 'solid';
  }
};

export default App;
