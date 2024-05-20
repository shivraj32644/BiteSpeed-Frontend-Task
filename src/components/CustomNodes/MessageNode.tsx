
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }:any) => (
  <div className="custom-node">
    <Handle type="target" position={Position.Left} />
    <div>{data.label}</div>
    <Handle type="source" position={Position.Right} />
  </div>
);

export default CustomNode;
