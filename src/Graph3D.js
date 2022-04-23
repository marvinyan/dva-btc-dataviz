import { useRef, useEffect, useCallback } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { INCORRECT } from './constants';

const distance = 400;

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
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      fgRef.current.cameraPosition({ x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, node, 1000);
    },
    [fgRef]
  );

  const recoloredGraphData = structuredClone(graphData);
  recoloredGraphData.nodes.forEach((node) => {
    if (node.prediction === INCORRECT) {
      node.color = 'fuchsia';
    }
  });

  return (
    <ForceGraph3D
      ref={fgRef}
      graphData={recoloredGraphData}
      cooldownTicks={100}
      onNodeClick={zoomInNode}
      nodeLabel={(node) => node.name}
      linkLabel={(link) => link.name}
      linkDirectionalArrowLength={5}
      linkDirectionalArrowRelPos={1}
    />
  );
};

export default Graph3D;
