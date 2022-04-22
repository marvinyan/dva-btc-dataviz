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

  return (
    <div className="App">
      <header className="App-header"></header>
      {graphData ? showGraphs(graphData) : null}
    </div>
  );
};

const showGraphs = (graphData) => {
  return (
    <Fragment>
      <div className="tabs">
        <button className="tablinks" onClick={() => showGraph('2D')}>
          2D
        </button>
        <button className="tablinks" onClick={() => showGraph('3D')}>
          3D
        </button>
      </div>
      <div className="graphs">
        <div className="graph2D" >
          <Graph2D graphData={graphData} />
        </div>
        <div className="graph3D">
          <Graph3D graphData={graphData} />
        </div>
      </div>
    </Fragment>
  );
};

const showGraph = (graphType) => {
  const graph2D = document.getElementsByClassName('graph2D');
  const graph3D = document.getElementsByClassName('graph3D');

  if (graphType === '3D') {
    graph3D[0].style.display = 'block';
    graph2D[0].style.display = 'none';
  } else {
    graph3D[0].style.display = 'none';
    graph2D[0].style.display = 'block';
  }
};

export default App;
