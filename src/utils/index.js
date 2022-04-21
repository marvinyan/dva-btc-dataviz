/*
Returns an object that looks like 
{
  "nodes": [ 
      { 
        "id": "id1",
        "name": "name1",
      },
      { 
        "id": "id2",
        "name": "name2",
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
export const formatData = (data, seedTxId, maxNodes = 1000) => {
  const output = { nodes: [], links: [] };

  const adjacencyList = {};
  data.forEach((edge) => {
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
            output.links.push({ source: current, target: neighbor });
          }
        });
      }
    }
  }

  output.nodes = Array.from(visited).map((id) => ({ id }));
  return output;
};
