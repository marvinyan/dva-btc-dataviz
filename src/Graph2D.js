import { useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';

const Graph2D = ({ graphData }) => {
  // const fgRef = useRef();

  // const zoomInNode = useCallback(
  //   (node) => {
  //     const distance = 400;
  //     const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

  //     fgRef.current.cameraPosition({ x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, node, 1000);
  //   },
  //   [fgRef]
  // );

  return (
    <ForceGraph2D
      // ref={fgRef}
      backgroundColor="#eee8d5"
      graphData={graphData}
      nodeLabel={(node) => node.name}
      linkLabel={(link) => link.name}
      linkDirectionalArrowLength={5}
      linkDirectionalArrowRelPos={1}
    />
  );
};

export default Graph2D;
