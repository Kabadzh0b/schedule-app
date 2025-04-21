import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScheduleList } from "./ScheduleList";
import { TrainDetails } from "./TrainDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<ScheduleList />} />
          <Route path="/:id" element={<TrainDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
