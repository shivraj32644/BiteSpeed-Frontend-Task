import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Node } from "reactflow";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

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
  // State to manage the label of the selected node
  const [label, setLabel] = useState(selectedNode?.data?.label);

  const updateNodeLabel = () => {
    if (selectedNode) {
      setNodes((nds) => {
        // Map through nodes and update the label of the selected node
        return nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, label: label } }
            : node
        );
      });
    }
  };
  // useEffect hook to call updateNodeLabel whenever the label state changes
  useEffect(() => {
    updateNodeLabel();
  }, [label]);

  // Function to handle the save button click this will be triggered when user press back button
  const handleSaveChange = () => {
    // Checking if the label is not empty
    if (!label.length) {
      // Showing warning if label(text) is empty
      toast.warning("Node Text should not be empty! please write something")
      
    } else {
      // Switching back to NodePanel if label is valid
      setPanelType("NodePanel");
    }
  };
  return (
    <div className="py-1">

      <div className="border relative flex items-center justify-center py-3 px-4">
        {/* Back button to switch back to NodePanel */}
        <button
          onClick={handleSaveChange}
          className="p-2 absolute left-2 rounded-md bg-muted opacity-75 hover:opacity-100"
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
            className="w-full bg-[var(--foreground)] mt-2 rounded-md px-4 py-2 border "
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
