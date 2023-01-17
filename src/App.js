import { DragDropContext } from "react-beautiful-dnd";
import Boards from "./components/Boards/Boards";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>    
      <Navbar/>
      <Boards/>
    </div>
  );
}

export default App;
