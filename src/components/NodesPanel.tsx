import { MessageCircleMore } from "lucide-react";

export const NodesPanel = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
};
  


  return (
    <div  className="border w-full h-full p-4 ">
      {/* Message Node */}
      <button
        onDragEnter={(event) => onDragStart(event, "textNode")}
        draggable
        className="w-[150px] cursor-grab border border-blue-500 text-blue-500 gap-2 flex-col h-[80px] rounded-md select-none flex items-center justify-center "
      >
        <MessageCircleMore />
        <span>Message</span>
      </button>
    </div>
  );
};
