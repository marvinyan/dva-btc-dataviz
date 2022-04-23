# Identifying Illicit Behavior in Bitcoin's Blockchain
Check out the app at https://marvinyan.github.io/dva-btc-dataviz/

## Running the code locally
1. Install project dependencies: `yarn install`
2. Run the web app: `yarn start`
3. A browser tab should automatically open. If not, go to `localhost:3000/dva-btc-dataviz`.

## Subset creation
A subset of the dataset must be generated as there are far too many nodes and edges to display efficiently in a web browser. By creating an adjacency list based on the edges in the large dataset, we can quickly ascertain all destination nodes that can be reached from any given source node. The adjacency list is traversed using breadth-first search to construct a tree where the root can be any point of interest. Once a specified number of nodes and edges have been collected, the tree is complete and can be visualized with minimal performance impact.

## Visualization
The network graph is rendered using the react-force-graph. This library displays the graphics using Canvas and WebGL and simulates the physics using Verlet integration, a simple method of calculating particle trajectories using only position and time. It is critical for both subset creation and visualization to be performant so that the user may quickly explore the network using any transaction ID as the starting point.
