# Identifying Illicit Behavior in Bitcoin's Blockchain
Check out the app at https://marvinyan.github.io/dva-btc-dataviz/

## Installation
Install project dependencies: `yarn install`. Alternatively, you may use `npm install` if you don't have yarn.

## Execution
1. Run the web app: `yarn start`. Alternatively, you may use `npm run start` if you don't have yarn.
2. A browser tab should automatically open. If not, enter `localhost:3000/dva-btc-dataviz` in your browser's address bar.

## Description
### Subset creation
A subset of the dataset must be generated as there are far too many nodes and edges to display efficiently in a web browser. By creating an adjacency list based on the edges in the large dataset, we can quickly ascertain all destination nodes that can be reached from any given source node. The adjacency list is traversed using breadth-first search to construct a tree where the root can be any point of interest. Once a specified number of nodes and edges have been collected, the tree is complete and can be visualized with minimal performance impact.

### Visualization
The network graph is rendered using the react-force-graph. This library displays the graphics using Canvas and WebGL and simulates the physics using Verlet integration, a simple method of calculating particle trajectories using only position and time. It is critical for both subset creation and visualization to be performant so that the user may quickly explore the network using any transaction ID as the starting point.
