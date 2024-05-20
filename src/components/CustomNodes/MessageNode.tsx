import { Handle, Position } from "reactflow";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { MessageCircleMore } from "lucide-react";

const MessageNode = ({ data }: { data: { label: string } }) => {
  return (
    <Card className="w-[200px] rounded-md overflow-hidden p-0">
      <CardHeader className=" p-0">
        <CardTitle className="h-8 bg-[#128C7E] flex items-center justify-start gap-3 px-3 ">
          <MessageCircleMore className="w-4 h-4" />
          <span className="text-sm text-white">Send Message</span>
          
        </CardTitle>
        <CardDescription className="px-4 text-wrap py-2">
          <h1 className="text-[var(--text-color)] text-wrap">{data.label}</h1>
        </CardDescription>
      </CardHeader>

      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#000" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#000" }}
      />
    </Card>
  );
};

export default MessageNode;
