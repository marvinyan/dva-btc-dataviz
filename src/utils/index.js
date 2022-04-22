/*
Returns an object that looks like 
{
  "nodes": [ 
      { 
        "id": "id1",
        "class": "class1",
      },
      { 
        "id": "id2",
        "class": "class2",
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

The nodes come from ./datasets/elliptic_txs_classes.csv which has columns txId, class
The edges come from ./datasets/elliptic_txs_edgelist.csv which has columns txId1, txId2
*/
export const formatData = (nodeData, edgeData, seedTxId, maxNodes = 500) => {
  const output = { nodes: [], links: [] };

  const txIdToClass = new Map();
  nodeData.forEach((node) => {
    txIdToClass.set(node.txId, node.class);
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
      name: `Transaction ID: ${id}<br>Class: ${classStr}<br>Degree: ${adjacencyList[id].length}`,
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
