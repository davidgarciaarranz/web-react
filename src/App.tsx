import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitPage from "./pages/InitPage/InitPage";
import EventsPage from "./pages/Events/EventsPage";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<InitPage />} />
          <Route path="/events" element={<EventsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
