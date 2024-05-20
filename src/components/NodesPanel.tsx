import { MessageCircleMore } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface INodePanelProps {
  checkUnconnectedNodes: () => void;
}

const nodesArr = [
  {
    id: 1,
    nodeType: "textNode",
    icon: <MessageCircleMore className="text-[#25D366] h-10 w-10" />,
    nodeName: "Message",
    cardDescription:"Drag and Drop this card to add a text node"
  },
  
];

export const NodesPanel = ({ checkUnconnectedNodes }: INodePanelProps) => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="border relative w-full h-full p-4 ">
      {/* Message Node */}
      <div className="h-[460px] border-b flex flex-col gap-3 px-4 py-6 overflow-auto">
        {nodesArr.map((node) => (
          <Card
            key={node.id}
            onDragEnter={(event) => onDragStart(event, node.nodeType)}
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
      <div className="absolute flex items-center justify-center w-[80%] bottom-8">
        <button
          className=" m-auto  border border-blue-400 py-2 px-6 rounded hover:bg-blue-500 hover:text-white"
          onClick={checkUnconnectedNodes}
        >
          Save Flow
        </button>
      </div>
    </div>
  );
};
