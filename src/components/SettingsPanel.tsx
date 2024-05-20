import { ArrowLeft } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Node } from "reactflow";

interface ISettingPanelProps {
  selectedNode: Node | null;

  setPanelType: Dispatch<SetStateAction<"NodePanel" | "SettingPanel">>;
  setNodes: Dispatch<
    SetStateAction<
      Node<
        {
          label: string;
        },
        string | undefined
      >[]
    >
  >;
}

const SettingsPanel = ({
  setNodes,
  selectedNode,

  setPanelType,
}: ISettingPanelProps) => {
  const [label, setLabel] = useState(selectedNode?.data?.label);

  const updateNodeLabel = () => {
    if (selectedNode) {
      setNodes((nds) => {
        return nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, label: label } }
            : node
        );
      });
    }
  };
  useEffect(() => {
    updateNodeLabel();
  }, [label]);

  const handleSaveChange = () => {
    if (!label.length) {
      alert("Text not be empty! please write somthing");
    } else {
      setPanelType("NodePanel");
    }
  };
  return (
    <div className="py-1">
      <div className="border relative flex items-center justify-center py-3 px-4">
        <button
          onClick={handleSaveChange}
          className="p-2 absolute left-2 rounded-md bg-neutral-200 opacity-75 hover:opacity-100"
        >
          <ArrowLeft className="w-4 h-4 " />
        </button>
        <h1 className="font-semibold text-center text-lg ">Message</h1>
      </div>

      <div className="p-4">
        <label className="" htmlFor="NodeText">
          <span className="text-sm text-[var(--text-secondary)]">Text</span>
          <textarea
            id="NodeText"
            className="w-full mt-2 rounded-md px-4 py-2 border "
            placeholder="Enter Text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default SettingsPanel;
