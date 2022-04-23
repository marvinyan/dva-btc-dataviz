import { CORRECT, INCORRECT, NO_PREDICTION, UNKNOWN } from '../constants';

/*
Returns an object that looks like 
{
  "nodes": [ 
      { 
        "id": "id1",
        "class": "class1",
        "prediction": "Correct",
      },
      { 
        "id": "id2",
        "class": "class2",
        "prediction": "No Prediction"
      },
      ...
  ],
  "links": [
      {
          "source": "id1",
          "target": "id2"
      },
      ...
  ]
}

The nodes come from ./datasets/df_classes_with_predicted_vals.csv which has columns rowId,txId,class,predicted_vals
The edges come from ./datasets/elliptic_txs_edgelist.csv which has columns txId1, txId2
*/
export const formatData = (nodeData, edgeData, seedTxId, maxNodes = 500) => {
  const output = { nodes: [], links: [] };

  const txIdToClass = new Map(); // values are from predicted_vals
  const txIdToPrediction = new Map(); // values: 'Correct', 'No Prediction', 'Incorrect'

  nodeData.forEach((node) => {
    const predictedClass = node.predicted_vals === 'None' ? UNKNOWN : node.predicted_vals;
    txIdToClass.set(node.txId, predictedClass);
    if (predictedClass === UNKNOWN && node.class === UNKNOWN) {
      txIdToPrediction.set(node.txId, NO_PREDICTION);
    } else {
      txIdToPrediction.set(node.txId, predictedClass === node.class ? CORRECT : INCORRECT);
    }
  });

  const adjacencyList = {};
  edgeData.forEach((edge) => {
    const { txId1, txId2 } = edge;

    if (!adjacencyList[txId1]) {
      adjacencyList[txId1] = [txId2];
    } else {
      adjacencyList[txId1].push(txId2);
    }

    if (!adjacencyList[txId2]) {
      adjacencyList[txId2] = [txId1];
    } else {
      adjacencyList[txId2].push(txId1);
    }
  });

  // Do breadth-first search starting from seedTxId.
  const queue = [seedTxId];
  const visited = new Set();
  visited.add(seedTxId);

  while (visited.size < maxNodes) {
    const current = queue.shift();
    if (current) {
      const neighbors = adjacencyList[current];

      if (neighbors) {
        neighbors.forEach((neighbor) => {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);

            output.links.push({
              source: current,
              target: neighbor,
              name: `Transaction Link<br>${current} → ${neighbor}`,
            });
          }
        });
      }
    }
  }

  output.nodes = Array.from(visited).map((id) => {
    const classColor = getNodeColor(txIdToClass.get(id));
    const classStr = getClassString(txIdToClass.get(id));
    return {
      id,
      val: Math.sqrt(adjacencyList[id].length),
      color: classColor,
      degree: adjacencyList[id].length,
      name: `Transaction ID: ${id}<br>Class: ${classStr}<br>Degree: ${
        adjacencyList[id].length
      }<br>Prediction: ${txIdToPrediction.get(id)}`,
      prediction: txIdToPrediction.get(id),
    };
  });

  return output;
};

const getNodeColor = (classNum) => {
  switch (classNum) {
    case '1':
      return '#ff0000';
    case '2':
      return '#228B22';
    default:
      return '#3a3b3c';
  }
};

const getClassString = (classNum) => {
  switch (classNum) {
    case '1':
      return 'Illicit';
    case '2':
      return 'Licit';
    default:
      return 'Unknown';
  }
};
