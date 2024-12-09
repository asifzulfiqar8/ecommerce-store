import { useState } from "react";
import Aside from "./pages/Aside";
import Main from "./pages/Main";
import RightSide from "./pages/RightSide";

function App() {
  const [asideOpen, setAsideOpen] = useState(false);
  const [rightSideOpen, setRightSideOpen] = useState(false);

  const handleAsideOpen = () => {
    setAsideOpen(!asideOpen);
  };
  const handleRightSideOpen = () => setRightSideOpen(!rightSideOpen);
  return (
    <div className="flex justify-center gap-6 p-6 w-full h-screen">
      <div
        className={`cursor-pointer transition-all duration-300 ${
          asideOpen ? "basis-0" : "basis-[20%]"
        }`}
        onClick={() => handleAsideOpen()}
      >
        <Aside />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ${
          asideOpen && rightSideOpen ? "basis-[100%]" : "basis-[60%]"
        }`}
      >
        <Main />
      </div>
      <div
        className={`cursor-pointer transition-all duration-300 ${
          rightSideOpen ? "basis-0" : "basis-[20%]"
        }`}
        onClick={() => handleRightSideOpen()}
      >
        <RightSide />
      </div>
    </div>
  );
}

export default App;
