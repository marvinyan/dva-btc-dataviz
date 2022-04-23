import { ForceGraph2D } from 'react-force-graph';
import { CORRECT, INCORRECT } from './constants';

const NODE_R = 4;

const Graph2D = ({ graphData }) => {
  const paintRing = (node, ctx) => {
    if (node.prediction === CORRECT || node.prediction === INCORRECT) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, (node.val + NODE_R) * 1.1, 0, 2 * Math.PI, false);
      if (node.prediction === CORRECT) {
        ctx.fillStyle = 'cyan';
      } else {
        ctx.fillStyle = 'fuchsia';
      }
      ctx.fill();
    }
  };

  return (
    <ForceGraph2D
      backgroundColor="#eee8d5"
      graphData={graphData}
      nodeLabel={(node) => node.name}
      linkLabel={(link) => link.name}
      linkDirectionalArrowLength={5}
      linkDirectionalArrowRelPos={1}
      nodeCanvasObject={paintRing}
      nodeCanvasObjectMode={() => 'before'}
    />
  );
};

export default Graph2D;
