import React, { useState, useEffect } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import { csv } from 'd3';
import './App.css';
import ellipticNodes from './datasets/elliptic_txs_classes.csv';
import ellipticEdges from './datasets/elliptic_txs_edgelist.csv';
import { formatData } from './utils';

const App = () => {
  // call formatData and save the result in a variable
  // use the useEffect hook to call the formatData function
  const [rawData, setRawData] = useState();
  const [seedTxId, setSeedTxId] = useState("355110272")

  useEffect(() => {
    csv(ellipticEdges).then((data) => {
      setRawData(data);
    });
  }, []);

  const graphData = rawData ? formatData(rawData, seedTxId) : null
  console.log(graphData);

  return (
    <div className="App">
      <header className="App-header"></header>
      {graphData ? <ForceGraph3D graphData={graphData} /> : null}
    </div>
  );
};

export default App;

// d3.csv(ellipticNodes).then((data) => {
//   for (let i = 0; i < 5; i++) {
//     const node = data[i];
//     usedTxIds.add(node.txId);

//     let label = node.class;
//     if (label === 'unknown') {
//       label = 'Unknown';
//     } else if (label === '1') {
//       label = 'Illicit';
//     } else {
//       label = 'Licit';
//     }

//     output.nodes.push({
//       id: node.txId,
//       name: `${node.txId} - ${label}`,
//     });
//   }
// });

// d3.csv(ellipticEdges).then((data) => {
//   data.forEach((edge) => {
//     if (usedTxIds.has(edge.txId1) || usedTxIds.has(edge.txId2)) {
//       output.links.push({
//         source: edge.txId1,
//         target: edge.txId2,
//       });
//     }
//   });
// });
