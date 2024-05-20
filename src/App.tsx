import Navbar from "./components/Navbar";
import ChatbotFlow from "./pages/ChatbotFlow";

export default function App() {
  return (
    <div>
      <Navbar />
      {/* Right Now we have only one page in our
       application so i am not using `React Router`
       i am directly importing ChatbotFlow page */}
      <ChatbotFlow />
    </div>
  );
}
