import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/sonner";
import ChatbotFlow from "./pages/ChatbotFlow";

export default function App() {
  return (
    <div>
         <Toaster position="top-center"/>
      <Navbar />
      {/* Right Now we have only one page in our
       application so i am not using `React Router`
       i am directly importing ChatbotFlow page */}
      <ChatbotFlow />
    </div>
  );
}
