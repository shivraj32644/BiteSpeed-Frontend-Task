import { MessageCircleMore } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface INodePanelProps {
  checkUnconnectedNodes: () => void;
}

const nodesArr = [
  {
    id: 1,
    nodeType: "messageNode",
    icon: <MessageCircleMore className="text-[#25D366] h-10 w-10" />,
    nodeName: "Message",
    cardDescription:"Drag and Drop this card to add a text node"
  },
  // Additional nodes can be added here
];

export const NodesPanel = ({ checkUnconnectedNodes }: INodePanelProps) => {
// Function to handle drag start event
  const handleDragStart = (event: React.DragEvent, nodeType: string) => {
    // Setting the data to be transferred during the drag event so that we can use at the time of onDrop
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="border w-full h-full ">
      <Button
          className="mt-2 ml-3"
          onClick={checkUnconnectedNodes}
        >
          Save Flow
        </Button>
   
      <div className="h-[80vh] global-scroll-bar  flex flex-col gap-3 px-4 py-6 overflow-auto">
        {/* Mapping the nodes to show all differrent types of nodes */}
        {nodesArr.map((node) => (
          <Card
            key={node.id}
            onDragStart={(event) => handleDragStart(event, node.nodeType)}
            draggable
            className="flex w-full cursor-grab items-center justify-between"
          >
            <CardHeader className="flex py-3 flex-col gap-0">
              {node.icon}
              <div>
                <CardTitle className="text-lg m-0 p-0">
                  {node.nodeName}
                </CardTitle>
                <CardDescription className="m-0 text-xs p-0">
                  {node.cardDescription}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
     
    </div>
  );
};
