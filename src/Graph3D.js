import { useRef, useEffect, useCallback } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const Graph3D = ({ graphData }) => {
  const fgRef = useRef();

  useEffect(() => {
    const bloomPass = new UnrealBloomPass();
    bloomPass.strength = 1;
    bloomPass.radius = 1;
    bloomPass.threshold = 0.1;
    fgRef.current.postProcessingComposer().addPass(bloomPass);
    
  }, []);
  
  const zoomInNode = useCallback(
    (node) => {
      const distance = 400;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      fgRef.current.cameraPosition({ x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, node, 1000);
    },
    [fgRef]
  );

  return (
    <ForceGraph3D
      ref={fgRef}
      graphData={graphData}
      // linkWidth={2}
      cooldownTicks={100}
      // onEngineStop={() => {
      //   fgRef.current.zoomToFit(800);
      // }}
      onNodeClick={zoomInNode}
      nodeLabel={(node) => node.name}
      linkLabel={(link) => link.name}
      linkDirectionalArrowLength={5}
      linkDirectionalArrowRelPos={1}
    />
  );
};

export default Graph3D;
