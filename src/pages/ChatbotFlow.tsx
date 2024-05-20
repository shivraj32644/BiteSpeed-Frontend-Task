import {  useCallback, useState } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  NodeResizer,
  NodeResizeControl,
  BackgroundVariant,
  Background,
  useReactFlow,
  Node,
  Edge,
  Connection,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";


import { NodesPanel } from "../components/NodesPanel";
import SettingsPanel from "../components/SettingsPanel";
import MessageNode from "../components/CustomNodes/MessageNode";
import { toast } from "sonner";

const nodeTypes = { messageNode: MessageNode };

// An array of initial Nodes if you want to display some initial node in this app
const initialNodes = [

  { id: "1",type: 'messageNode', sourcePosition: Position.Right, targetPosition: Position.Left, position: { x: 100, y: 100 }, data: { label: "Message One" } },
  { id: "2",type: 'messageNode',  sourcePosition: Position.Right, targetPosition: Position.Left, position: { x: 400, y: 200 }, data: { label: "Message Two" } },
    //... More initial nodes object
];


// Initial Edges for initial Nodes
const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  
];

export default function ChatbotFlow() {
    // Use React Flow hooks to manage nodes and edges state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { project } = useReactFlow();

  // below [selectedNode, setSelectedNode] is used to store the current selected Node by user so that we can change the label of selected node
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // [panelType, setPanelType] this state is used to dynamically render the right side panes by default "Node Panel" opened when use clicks on any node we will open node setting panel.
  const [panelType, setPanelType] = useState<"NodePanel" | "SettingPanel">("NodePanel");

  // The below function "handleNodeClick" is used to handle the Click event of Node
  const handleNodeClick = useCallback((_:any, node: Node) => {
    setSelectedNode(node);
    setPanelType("SettingPanel");
  }, []);


  // The below "onConnect" function is used to connect the edges of nodes.
  /* This function check the condition from doc before connect the edges
        4. **Source Handle**
            1. Source of a connecting edge 
            2. Can only have **one edge** originating from a source handle
        5. **Target Handle** 
            1. Target of a connecting edge
            2. Can have **more than one edge** connecting to a target handle
  */
  const onConnect = useCallback(
    (params: Edge | Connection) => {
      // Check if the source handle already has an outgoing edge
      const hasOutgoingEdge = edges.some((edge) => edge.source === params.source);

      if (!hasOutgoingEdge) {
        setEdges((eds) => addEdge(params, eds));
      } else {
        // if user violates the condition then we show an alert to user
        toast.warning('A source handle can only have one edge originating from it.')
        
      }
    },
    [edges, setEdges]
  );

// The below "handleOnDrop" Function to handle drop event when adding a new node
  const handleOnDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const reactFlowBounds = event.currentTarget.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow")
   
    const position = project({
      x: event.clientX - 50 - reactFlowBounds.left,
      y: event.clientY - 10 - reactFlowBounds.top,
    });
    // Create a new Node where source is in right side and target is in left side
    const newNode = {
      id: (nodes.length + 1).toString(),
      type,
      sourcePosition: Position.Right, targetPosition: Position.Left,
      data: { 
        label: `New Node ${nodes.length + 1}`
     },
      position: position,
    };
    // Update the nodes state with the new node
    setNodes((nds) => nds.concat(newNode));
  };

  //The "handleOnDragOver" function to handle drag over event
  const handleOnDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    
  };

  // Function to check unconnected nodes 
  const checkUnconnectedNodes = () => {
    // using Set Data Structure to store the IDs of connected nodes
    const connectedNodeIds = new Set<string>();

    // Loop through each edge in the flow Board
    edges.forEach((edge) => {
        // Adding the source and target "IDs" of the EDGEs to the "SET" of connected nodes
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    // Filtering nodes to find unconnected nodes
    const unconnectedNodes = nodes.filter((node) => !connectedNodeIds.has(node.id));

    // Checking if there are any unconnected nodes
    if (unconnectedNodes.length > 0) {
        toast.error('There are some unconnected nodes! Please connect all Nodes to save the flow')
    
    } else {
        toast.success('Flow Save Successfully!')
    
    }
  };
  return (
    <div className="h-screen">
      
      <div className=" m-auto grid grid-cols-8">
        <div
          className="bg-[var(--background)] border-none col-span-6"
          style={{ width: "100%", height: "90vh" }}
          onDrop={handleOnDrop}
          onDragOver={handleOnDragOver}
        >
          <ReactFlow
            style={{ border: "0px solid black" }}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onNodeClick={handleNodeClick}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
          >
            <NodeResizer />
            <NodeResizeControl />
            <Controls />

            <Background
              variant={"dots" as BackgroundVariant}
              gap={12}
              size={1}
            />
          </ReactFlow>
        </div>
        <div className="col-span-2">
        {/* Rendering either "NodesPanel" or "SettingsPanel" based on "panelType" state */}
          {panelType === "NodePanel" ? (
            <NodesPanel checkUnconnectedNodes={checkUnconnectedNodes} />
          ) : (
            <SettingsPanel
              setNodes={setNodes}
              selectedNode={selectedNode}
              setPanelType={setPanelType}
              
            />
          )}
        </div> 
      </div>
    </div>
  );
}
